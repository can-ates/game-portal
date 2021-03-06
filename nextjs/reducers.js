import { combineReducers } from 'redux'
import * as types from './actions/types'

// INITIAL USER STATE
const initialUserState = {
  authenticated: false,
  credentials: {},
  loading: false,
  errors: ''
}

// USER REDUCER
const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case types.SET_UNAUTHENTICATED:
      return initialUserState;
    case types.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...payload
      }
      case types.LOADING_USER:
      return {
        ...state,
        loading: true
      };
      case types.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
      case types.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  user: userReducer,
}

export default combineReducers(reducers)