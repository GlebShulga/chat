import axios from 'axios'

const ADD_CHANNEL = 'ADD_CHANNEL'
const GET_CHANNEL = 'GET_CHANNEL'
const GET_CHANNEL_LIST = 'GET_CHANNEL_LIST'

const initialState = {
  listOfChannels: [],
  channel: {}
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
    default:
      return state
  }
}

export function addChannel(channelTitle, channelDescription) {
  return (dispatch, getState) => {
    axios({
      method: 'post',
      url: `/api/v1/channels/${channelTitle}`,
      data: { channelDescription }
    }).then(() => {
      const state = getState().channels
      const listOfChannels = [...state.listOfChannels, channelTitle]
      dispatch({ type: ADD_CHANNEL, listOfChannels })
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
