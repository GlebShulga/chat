import axios from 'axios'

const ADD_USER = 'ADD_USER'
const GET_USER_LIST = 'GET_USER_LIST'
const SET_CURRENT_USER = 'SET_CURRENT_USER'

const initialState = {
  listOfUsers: [],
  currentUserName: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
    case ADD_USER: {
      return { ...state, listOfUsers: action.listOfUsers }
    }
    case SET_CURRENT_USER: {
      return { ...state, currentUserName: action.currentUserName }
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

export function setCurrentUser(userName) {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfUsers } = store.users
    const currentUser = [...listOfUsers].find((user) => user.userName === userName)
    const currentUserName = currentUser ? currentUser.userName : undefined
    dispatch({
      type: SET_CURRENT_USER,
      currentUserName
    })
  }
}
