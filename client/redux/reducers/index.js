import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import channels from './channels'
import messages from './messages'
import users from './users'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    channels,
    messages,
    users
  })

export default createRootReducer
