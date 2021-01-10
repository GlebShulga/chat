import axios from 'axios'

const ADD_MESSAGE = 'ADD_MESSAGE'

const initialState = {
  messageList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return { ...state }
    }
    default:
      return state
  }
}

export function addMessage() {}
