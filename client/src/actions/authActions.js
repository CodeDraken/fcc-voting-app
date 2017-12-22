import axios from 'axios'

import { GET_CURRENT_USER } from './types'

// get logged in user's data
export const getCurrentUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/current_user')

    dispatch({ type: GET_CURRENT_USER, payload: res.data })
  } catch (error) {
    console.log(GET_CURRENT_USER, error)
    // TODO: dispatch failed to get user / error handle
  }
}

export default {
  getCurrentUser
}
