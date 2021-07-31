import axios from 'axios'
import { getSocket } from '../index'

const ADD_MESSAGE = 'ADD_MESSAGE'
const GET_MESSAGES_LIST = 'GET_MESSAGES_LIST'
const UPDATE_MESSAGES_FROM_SOCKET = 'UPDATE_MESSAGES_FROM_SOCKET'
const NULLIFY_MESSAGES_FROM_SOCKET = 'NULLIFY_MESSAGES_FROM_SOCKET'

const initialState = {
  listOfMessages: [],
  listOfMessagesFromSocket: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_LIST:
    case ADD_MESSAGE: {
      return { ...state, listOfMessages: action.listOfMessages }
    }
    case UPDATE_MESSAGES_FROM_SOCKET: {
      return {
        ...state,
        listOfMessagesFromSocket: [...state.listOfMessagesFromSocket, action.data]
      }
    }
    case NULLIFY_MESSAGES_FROM_SOCKET: {
      return { ...state, listOfMessages: [] }
    }
    default:
      return state
  }
}

export function addMessage(messageText, channelId, userId, messageTime) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/api/v1/messages`,
      data: { messageText, channelId, userId, messageTime }
    }).then(({ data: listOfMessages }) => {
      dispatch({ type: ADD_MESSAGE, listOfMessages })
      getSocket()?.emit('chat message', {
        messageText,
        userId,
        room: channelId,
        messageTime
      })
    })
  }
}

export function getMessages() {
  return (dispatch) => {
    axios(`/api/v1/messages`)
      .then(({ data: listOfMessages }) => {
        dispatch({ type: GET_MESSAGES_LIST, listOfMessages })
      })
      .catch(() => dispatch({ type: GET_MESSAGES_LIST, listOfMessages: [] }))
  }
}

export function updatelistOfMessagesFromSocket(data) {
  return { type: UPDATE_MESSAGES_FROM_SOCKET, data }
}

export function nullifylistOfMessages() {
  return { type: NULLIFY_MESSAGES_FROM_SOCKET }
}
