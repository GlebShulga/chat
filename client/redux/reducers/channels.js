import axios from 'axios'
import { SUBSCRIPTION_ON_CHANNEL } from './users'

const ADD_CHANNEL = 'ADD_CHANNEL'
const GET_CHANNEL = 'GET_CHANNEL'
const GET_CHANNEL_LIST = 'GET_CHANNEL_LIST'
const SET_ERROR = 'SET_ERROR'

const initialState = {
  listOfChannels: [],
  channel: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL: {
      return { ...state, channel: action.channel }
    }
    case GET_CHANNEL_LIST:
    case ADD_CHANNEL: {
      return { ...state, listOfChannels: action.listOfChannels }
    }
    case SET_ERROR: {
      return { ...state, error: action.error }
    }
    case SUBSCRIPTION_ON_CHANNEL: {
      return { ...state, listOfUsers: action.listOfUsers }
    }
    default:
      return state
  }
}

export function addChannel(creatorId, channelTitle, channelDescription) {
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: `/api/v1/channels/${channelTitle}`,
      headers: {
        'content-Type': 'application/json'
      },
      data: { creatorId, channelDescription }
    })
      .then(({ data: listOfChannels }) => {
        dispatch({ type: ADD_CHANNEL, listOfChannels })
      })
      .then(() => {
        const store = getState()
        const { listOfUsers } = store.users
        const _id = creatorId
        const subscriptionOnChannels = channelTitle
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
      })
  }
}

export function getChannel(channelTitle) {
  return (dispatch) => {
    axios(`/api/v1/channels/${channelTitle}`).then(({ data }) => {
      dispatch({ type: GET_CHANNEL, channel: data })
    })
  }
}

export function getChannelsList() {
  return (dispatch) => {
    axios(`/api/v1/channelsList`)
      .then(({ data: listOfChannels }) => {
        dispatch({ type: GET_CHANNEL_LIST, listOfChannels })
      })
      .catch(() => dispatch({ type: GET_CHANNEL_LIST, listOfChannels: [] }))
  }
}
