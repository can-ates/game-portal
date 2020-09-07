import * as types from './types'

import  {instance}  from '../src/utils/axios';


export const signUpUser = (userData, router) => (dispatch) => {
  console.log('hello')
  dispatch({type: types.LOADING_USER})
  instance.post('/signup', userData)
  .then(res => {
    setAuthorizationHeader(res.data.token)
    dispatch(getAuthenticatedUser())
    router.push('/')
  })
  .catch(err => {
    console.log(err)
  })
}


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('idToken');
  delete instance.defaults.headers.common['Authorization'];
  dispatch({ type: types.SET_UNAUTHENTICATED });
};



export const getAuthenticatedUser = () => (dispatch) => {
  console.log('anan')
  instance
  .get('/user')
  .then(res => {
    dispatch({
      type: types.SET_USER,
      payload: res.data
    })
  })
  .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
  const idToken = `Bearer ${token}`;
  localStorage.setItem('idToken', idToken);
  instance.defaults.headers.common['Authorization'] = idToken;
};


