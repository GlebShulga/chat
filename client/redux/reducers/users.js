import axios from 'axios'

const ADD_USER = 'ADD_USER'
const GET_USER_LIST = 'GET_USER_LIST'

const initialState = {
  listOfUsers: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
    case ADD_USER: {
      return { ...state, listOfUsers: action.listOfUsers }
    }
    default:
      return state
  }
}

export function addUser(userId, userName, hashtag) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/api/v1/users`,
      data: { userId, userName, hashtag }
    }).then(({ data: listOfUsers }) => {
      dispatch({ type: ADD_USER, listOfUsers })
    })
  }
}

export function getUsers() {
  return (dispatch) => {
    axios('/api/v1/users')
      .then(({ data: listOfUsers }) => {
        dispatch({ type: GET_USER_LIST, listOfUsers })
      })
      .catch(() => dispatch({ type: GET_USER_LIST, listOfUsers: [] }))
  }
}
