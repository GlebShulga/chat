import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import channels from './channels'
import messages from './messages'
import users from './users'
import auth from './auth'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    channels,
    messages,
    users,
    auth
  })

export default createRootReducer
