import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import channels from './channels'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    channels
  })

export default createRootReducer
