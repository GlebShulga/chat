import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import auth from './middleware/auth'

import config from './config'
import Html from '../client/html'

import User from './model/User.model'

mongooseService.connect()

const { writeFile, readFile, readdir } = require('fs').promises

require('colors')

const { default: Root } = require('../dist/assets/js/ssr/root.bundle')
// console.log('SSR not found. Please run "yarn run build:ssr"'.red)

const templateUser = {
  login: '',
  password: '',
  userImage: 'url',
  hashtag: '',
  subscriptionOnChannels: []
}

const templateMessage = {
  userId: '',
  channel: '',
  messageId: '',
  messageText: '',
  createdAt: +new Date(),
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
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]
passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.get('/api/v1/user-info', auth([]), (req, res) => {
  res.json({ status: '123' })
})

server.get('/api/v1/test/cookies', (req, res) => {
  res.cookie('serverCookie', 'test', { maxAge: 90000, httpOnly: true })
  res.json({ status: res.cookies })
})

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/auth', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

server.post('/api/v1/channels/:channelTitle', async (req, res) => {
  const { channelTitle } = req.params
  const { channelDescription } = req.body
  toWriteChannel(channelTitle, { channelTitle, channelDescription }).then(async () => {
    await toReadChannel(channelTitle).then((channel) => res.json(channel))
  })
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
  const { login } = req.body
  const { password } = req.body
  const { hashtag } = req.body
  // const { userImage } = req.body
  const user = new User({
    ...templateUser,
    login,
    password,
    hashtag,
    userImage: 'photo'
  })
  user.save()
  res.json({ status: 'ok' })
  //   const usersList = await readFile(`${__dirname}/base/users/users.json`, { encoding: 'utf8' })
  //     .then((existingUsers) => {
  //       const list = [...JSON.parse(existingUsers), newUser]
  //       writeFile(`${__dirname}/base/users/users.json`, JSON.stringify(list), {
  //         encoding: 'utf8'
  //       })
  //       res.json(list)
  //     })
  //     .catch(async () => {
  //       writeFile(`${__dirname}/base/users/users.json`, JSON.stringify([newUser]), {
  //         encoding: 'utf8'
  //       })
  //       res.json([newUser])
  //     })
  //   res.json(usersList)
})

server.get('/api/v1/users', async (req, res) => {
  User.find({}).then((listOfUsers) => {
    res.json(listOfUsers)
  })
})

server.patch('/api/v1/users', async (req, res) => {
  const { _id } = req.body
  const { subscriptionOnChannels } = req.body
  User.updateOne(
    { _id },
    {
      $addToSet: {
        subscriptionOnChannels: [subscriptionOnChannels]
      }
    },
    (err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.send(result)
      }
    }
  )
})

server.delete('/api/v1/users', async (req, res) => {
  const { _id } = req.body
  const { subscriptionOnChannels } = req.body
  User.updateOne(
    { _id },
    {
      $pullAll: {
        subscriptionOnChannels: [subscriptionOnChannels]
      }
    },
    (err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.send(result)
      }
    }
  )
})

// server.delete('/api/v1/users', async (req, res) => {
//   const { userId } = req.body
//   const { subscriptionOnChannels } = req.body
//   const updatedUserSubscriptions = await readFile(`${__dirname}/base/users/users.json`, {
//     encoding: 'utf8'
//   })
//     .then((listOfUsers) => {
//       return JSON.parse(listOfUsers).map((user) => {
//         if (user.userId === +userId) {
//           const filteredSubscriptions = user.subscriptionOnChannels.filter(
//             (subscription) => subscription !== subscriptionOnChannels
//           )
//           return {
//             ...user,
//             subscriptionOnChannels: filteredSubscriptions
//           }
//         }
//         return user
//       })
//     })
//     .catch(() => {
//       res.status(404)
//       res.end()
//     })
//   writeFile(`${__dirname}/base/users/users.json`, JSON.stringify(updatedUserSubscriptions), {
//     encoding: 'utf8'
//   })
//   res.json(updatedUserSubscriptions)
// })

server.post('/api/v1/messages', async (req, res) => {
  const { messageText } = req.body
  const { channel } = req.body
  const { messageId } = req.body
  const { userId } = req.body
  const newMessage = {
    ...templateMessage,
    userId,
    channel,
    messageId,
    messageText,
    createdAt: +new Date()
  }
  const messageList = await readFile(`${__dirname}/base/messages/message.json`, {
    encoding: 'utf8'
  })
    .then((existingMessages) => {
      const list = [...JSON.parse(existingMessages), newMessage]
      writeFile(`${__dirname}/base/messages/message.json`, JSON.stringify(list), {
        encoding: 'utf8'
      })
      res.json(list)
    })
    .catch(async () => {
      writeFile(`${__dirname}/base/messages/message.json`, JSON.stringify([newMessage]), {
        encoding: 'utf8'
      })
      res.json([newMessage])
    })
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
