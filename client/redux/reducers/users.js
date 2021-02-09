import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'

const ADD_USER = 'ADD_USER'
const GET_USER_LIST = 'GET_USER_LIST'
export const SUBSCRIPTION_ON_CHANNEL = 'SUBSCRIPTION_ON_CHANNEL'
const SET_ERROR = 'SET_ERROR'

const cookies = new Cookies()
const initialState = {
  listOfUsers: [],
  token: cookies.get('token'),
  user: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_ON_CHANNEL:
    case GET_USER_LIST:
    case ADD_USER: {
      return { ...state, listOfUsers: action.listOfUsers }
    }
    case SET_ERROR: {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

export function addUser(login, password, hashtag, avatar) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/api/v1/users',
      headers: {
        'content-Type': 'application/json'
      },
      data: { login, password, hashtag, avatar }
    })
      .then((r) => r.data)
      .then((data) => {
        dispatch({ type: ADD_USER, token: data.token })
        history.push('/login')
      })
      .catch(() => dispatch({ type: SET_ERROR, error: 'User already exist' }))
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

export function subscriptionOnChannel(_id, subscriptionOnChannels) {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfUsers } = store.users
    const newUserSubscriptions = listOfUsers.map((user) =>
      user._id === _id
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
      data: { _id, subscriptionOnChannels }
    })
  }
}

export function unsubscriptionOnChannel(_id, subscriptionOnChannels) {
  return (dispatch, getState) => {
    const store = getState()
    const { listOfUsers } = store.users
    const delUserSubscriptions = listOfUsers.map((user) => {
      if (user._id === _id) {
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
      method: 'delete',
      url: '/api/v1/users',
      data: { _id, subscriptionOnChannels }
    })
  }
}
