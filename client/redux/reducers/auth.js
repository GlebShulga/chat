import Cookies from 'universal-cookie'
import { history } from '..'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const SET_ERROR = 'SET_ERROR'

const cookies = new Cookies()
const initialState = {
  login: '',
  password: '',
  token: cookies.get('token'),
  user: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
      return { ...state, login: action.login }
    }
    case LOGIN: {
      return { ...state, token: action.token, password: '', user: action.user }
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case SET_ERROR: {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

export function updateLoginField(login) {
  return { type: UPDATE_LOGIN, login }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function tryGetUserInfo() {
  return () => {
    try {
      fetch('/api/v1/user-info')
        .then((r) => r.json())
        .then((data) => {
          console.log(data)
        })
        .catch((error) => error)
    } catch (error) {
      console.log(error)
    }
  }
}

export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v1/auth')
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push('/main')
      })
  }
}

export function singIn() {
  return (dispatch, getState) => {
    const { login, password } = getState().auth
    fetch('/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: LOGIN, token: data.token, user: data.user })
        history.push('/main')
      })
      .catch(() => dispatch({ type: SET_ERROR, error: 'Login or password is not correct' }))
  }
}