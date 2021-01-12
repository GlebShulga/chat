/* eslint-disable no-unused-vars */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { writeFile, readFile, readdir } = require('fs').promises

require('colors')

const { default: Root } = require('../dist/assets/js/ssr/root.bundle')
// console.log('SSR not found. Please run "yarn run build:ssr"'.red)

const templateUser = {
  userId: '',
  userName: '',
  userImage: 'url',
  hashtag: '#userName'
}

const templateMessage = {
  userId: '',
  messageId: '',
  messageText: '',
  createdAt: +new Date().toLocaleDateString(),
  metaObj: {}
}

function toWriteChannel(channelTitle, text = {}) {
  writeFile(`${__dirname}/base/channels/${channelTitle}.json`, JSON.stringify(text), {
    encoding: 'utf8'
  })
}

function toReadChannel(channelTitle) {
  return readFile(`${__dirname}/base/channels/${channelTitle}.json`, {
    encoding: 'utf8'
  }).then((channel) => JSON.parse(channel))
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.post('/api/v1/channels/:channelTitle', async (req, res) => {
  const { channelTitle } = req.params
  const { channelDescription } = req.body
  toWriteChannel(channelTitle, { channelTitle, channelDescription })
  res.json({ status: 'ok' })
})

server.get('/api/v1/channelsList', async (req, res) => {
  const channelsList = await readdir(`${__dirname}/base/channels`).then((fileNames) =>
    fileNames.map((channelTitleJson) => channelTitleJson.slice(0, -5))
  )
  res.json(channelsList)
})

server.get('/api/v1/channels/:channelTitle', async (req, res) => {
  const { channelTitle } = req.params
  await toReadChannel(channelTitle).then((channel) => res.json(channel))
})

server.post('/api/v1/users', async (req, res) => {
  const { userName } = req.body
  const { userImage } = req.body
  const newUser = {
    ...templateUser,
    userId: 1,
    userName,
    userImage
  }
  const usersList = await readFile(`${__dirname}/base/users/users.json`, { encoding: 'utf8' })
    .then((existingUsers) => {
      const list = [...JSON.parse(existingUsers), newUser]
      writeFile(`${__dirname}/base/users/users.json`, JSON.stringify(list), {
        encoding: 'utf8'
      })
    })
    .catch(async () =>
      writeFile(`${__dirname}/base/users/users.json`, JSON.stringify([newUser]), {
        encoding: 'utf8'
      })
    )
  res.json(usersList)
})

server.get('/api/v1/users', async (req, res) => {
  readFile(`${__dirname}/base/users/users.json`, { encoding: 'utf8' }).then((user) =>
    res.json(JSON.parse(user))
  )
})

server.post('/api/v1/messages', async (req, res) => {
  const { messageText } = req.body
  const newMessage = {
    ...templateMessage,
    userId: 1,
    messageId: 1,
    messageText,
    createdAt: new Date().toLocaleDateString()
  }
  const messageList = await readFile(`${__dirname}/base/messages/message.json`, {
    encoding: 'utf8'
  })
    .then((existingMessages) => {
      const list = [...JSON.parse(existingMessages), newMessage]
      writeFile(`${__dirname}/base/messages/message.json`, JSON.stringify(list), {
        encoding: 'utf8'
      })
    })
    .catch(async () =>
      writeFile(`${__dirname}/base/messages/message.json`, JSON.stringify([newMessage]), {
        encoding: 'utf8'
      })
    )
  res.json(messageList)
})

server.get('/api/v1/messages', (req, res) => {
  readFile(`${__dirname}/base/messages/message.json`, { encoding: 'utf8' }).then((message) =>
    res.json(JSON.parse(message))
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
