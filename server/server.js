import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
// import sockjs from 'sockjs'
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
import Message from './model/Message.model'
import Channel from './model/Channel.model'

mongooseService.connect()

require('colors')

const templateUser = {
  login: '',
  password: '',
  userImage: 'url',
  hashtag: '',
  subscriptionOnChannels: []
}

const templateMessage = {
  userId: '',
  channelId: '',
  messageText: '',
  messageTime: ''
}

const connections = []

const port = process.env.PORT || 8090
const server = express()

const http = require('http').createServer(server)
const io = require('socket.io')(http)

const { default: Root } = require('../dist/assets/js/ssr/root.bundle')
// console.log('SSR not found. Please run "npm run build:ssr"'.red)

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
  res.json({ status: 'authentication - ok' })
})

server.get('/api/v1/test/cookies', (req, res) => {
  res.cookie('serverCookie', 'test', { maxAge: 90000, httpOnly: true })
  res.json({ status: res.cookies })
})

server.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    const payload = { uid: user._id }
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
    const payload = { uid: user._id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.status(504).send('Login or password is not correct')
  }
})

server.post('/api/v1/channels/:channelTitle', async (req, res) => {
  const { channelTitle } = req.params
  const { channelDescription, creatorId } = req.body
  const channel = new Channel({
    creatorId,
    channelTitle,
    channelDescription
  })
  channel.save()
  Channel.find({}).then((channelsList) => {
    res.json(channelsList)
  })
})

server.get('/api/v1/channelsList', async (req, res) => {
  Channel.find({}).then((channelsList) => {
    res.json(channelsList)
  })
})

server.get('/api/v1/channels/:channelTitle', async (req, res) => {
  const { channelTitle } = req.params
  Channel.findOne({ channelTitle }).then((channel) => {
    res.json(channel)
  })
})

server.post('/api/v1/users', async (req, res) => {
  const { login, password, hashtag, avatar } = req.body
  User.findOne({ login }).then((u) => {
    if (!u) {
      const user = new User({
        ...templateUser,
        login,
        password,
        hashtag,
        avatar
      })
      user.save()
      res.json({ status: 'ok' })
    } else {
      res.status(504).send('User already exist')
    }
  })
})

server.get('/api/v1/users', async (req, res) => {
  User.find({}).then((listOfUsers) => {
    res.json(listOfUsers)
  })
})

server.patch('/api/v1/users', async (req, res) => {
  const { _id, subscriptionOnChannels } = req.body
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
  const { _id, subscriptionOnChannels } = req.body
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

server.post('/api/v1/messages', async (req, res) => {
  const { messageText, channelId, userId, messageTime } = req.body
  const message = new Message({
    ...templateMessage,
    userId,
    channelId,
    messageText,
    messageTime
  })
  message.save()
  Message.find({}).then((listOfMessages) => {
    res.json(listOfMessages)
  })
})

server.get('/api/v1/messages', (req, res) => {
  try {
    Message.find({}).then((listOfMessages) => {
      res.json(listOfMessages)
    })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Chat'
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

http.listen(port, () => {
  console.log(`listening on *:${port}`)
})

let onlineUsers = []
let onlineUsersInfo = []

io.on('connection', async function (socket) {
  const { token } = socket.handshake.auth
  const jwtUser = jwt.verify(token, config.secret)

  const user = await User.findById(jwtUser.uid)
  console.log(`${user.login} connected, id:${socket.id}`)
  onlineUsers.push(user.login)

  socket.on('Join chat', (activeChannel) => {
    const userInfo = {
      id: socket.id,
      room: activeChannel
    }
    io?.emit('Online users', onlineUsers)
    onlineUsersInfo.push(userInfo)
  })

  socket.on('Update Online Users Info', (activeChannel) => {
    console.log(`${socket.id} went into the room ${activeChannel}`)
    onlineUsersInfo.map((it) => {
      if (it.id === socket.id) {
        // eslint-disable-next-line no-param-reassign
        it.room = activeChannel
      }
      return it
    })
  })

  socket.on('chat message', (data) => {
    const userInCurrentRoom = onlineUsersInfo.filter((it) => it.room === data.room)
    console.log(`message ${data.messageText} from ${data.userId} to #${data.room} `)
    userInCurrentRoom.forEach((it) => {
      io.to(`${it.id}`)?.emit('chat message', data)
    })
    console.log('Users are in the room:', userInCurrentRoom)
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((it) => it !== user.login)
    onlineUsersInfo = onlineUsersInfo.filter((it) => it.id !== socket.id)
    console.log(`${user.login} disconnected`)
    io?.emit('Online users', onlineUsers)
  })
})

export default function getConnections() {
  return connections
}

console.log(`Serving at http://localhost:${port}`)
