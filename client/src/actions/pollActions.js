import axios from 'axios'

import { FETCH_POLLS } from './types'

// get polls, optionally pass in page number
export const fetchPolls = (page = 0) => async dispatch => {
  try {
    const res = await axios.get(`/api/polls?page=${page}`)

    dispatch({ type: FETCH_POLLS, payload: res.data })
  } catch (error) {
    console.log(error)
    // TODO: dispatch failed to fetchPolls / error handle
  }
}

export default {
  fetchPolls
}
