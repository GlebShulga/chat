import axios from 'axios'

const ADD_MESSAGE = 'ADD_MESSAGE'
const GET_MESSAGES_LIST = 'GET_MESSAGES_LIST'

const initialState = {
  listOfMessages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_LIST:
    case ADD_MESSAGE: {
      return { ...state, listOfMessages: action.listOfMessages }
    }
    default:
      return state
  }
}

export function addMessage(messageText, channel, messageId, userId) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/api/v1/messages`,
      data: { messageText, channel, messageId, userId }
    }).then(({ data: listOfMessages }) => {
      dispatch({ type: ADD_MESSAGE, listOfMessages })
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
