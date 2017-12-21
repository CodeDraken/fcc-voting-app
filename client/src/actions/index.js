import axios from 'axios'

import { GET_CURRENT_USER, FETCH_POLLS } from './types'

// get logged in user's data
export const getCurrentUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/current_user')

    console.log('user: ', res.data)

    dispatch({ type: GET_CURRENT_USER, payload: res.data })
  } catch (err) {
    console.log(GET_CURRENT_USER, err)
    // TODO: dispatch failed to get user / error handle
  }
}
