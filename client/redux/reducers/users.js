import axios from 'axios'

const ADD_USER = 'ADD_USER'

const initialState = {
  usersList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return { ...state }
    }
    default:
      return state
  }
}

export function addUser() {

}