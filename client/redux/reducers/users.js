import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'

const ADD_USER = 'ADD_USER'
const GET_USER_LIST = 'GET_USER_LIST'
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const SUBSCRIPTION_ON_CHANNEL = 'SUBSCRIPTION_ON_CHANNEL'

const cookies = new Cookies()
const initialState = {
  listOfUsers: [],
  currentUserName: '',
  token: cookies.get('token'),
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_ON_CHANNEL:
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

export function addUser(userId, userName, password, hashtag) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/api/v1/users',
      headers: {
        'content-Type': 'application/json'
      },
      data: { userId, userName, password, hashtag }
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: ADD_USER, token: data.token })
        history.push('/login')
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

export function subscriptionOnChannel(userId, subscriptionOnChannels) {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfUsers } = store.users
    const newUserSubscriptions = listOfUsers.map((user) =>
      user.userId === +userId
        ? {
            ...user,
            subscriptionOnChannels: [...user.subscriptionOnChannels, subscriptionOnChannels]
          }
        : user
    )
    dispatch({ type: SUBSCRIPTION_ON_CHANNEL, listOfUsers: newUserSubscriptions })
    axios({
      method: 'patch',
      url: '/api/v1/users',
      data: { userId, subscriptionOnChannels }
    })
  }
}

export function unsubscriptionOnChannel(userId, subscriptionOnChannels) {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfUsers } = store.users
    const delUserSubscriptions = listOfUsers.map((user) => {
      if (user.userId === +userId) {
        const filteredSubscriptions = user.subscriptionOnChannels.filter(
          (subscription) => subscription !== subscriptionOnChannels
        )
        return {
          ...user,
          subscriptionOnChannels: filteredSubscriptions
        }
      }
      return user
    })
    dispatch({ type: SUBSCRIPTION_ON_CHANNEL, listOfUsers: delUserSubscriptions })
    axios({
      method: 'patch',
      url: '/api/v1/users',
      data: { userId, subscriptionOnChannels }
    })
  }
}
