import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import io from 'socket.io-client'
import rootReducer from './reducers'
import createHistory from './history'
import { updatelistOfMessagesFromSocket } from './reducers/messages'
import { updateOnlineUsers } from './reducers/channels'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)
let socket

export function createSocket(token) {
  socket = io(window?.location?.origin, {
    reconnection: true,
    reconnectionDelay: 500,
    autoConnect: true,
    reconnectionAttempts: 50,
    auth: {
      token
    }
  })

  socket.on('chat message', function (data) {
    store.dispatch(updatelistOfMessagesFromSocket(data))
  })

  socket.on('Online users', function (data) {
    store.dispatch(updateOnlineUsers(data))
  })
}

export function getSocket() {
  return socket
}
export default store
