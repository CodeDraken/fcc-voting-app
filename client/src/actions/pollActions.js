import axios from 'axios'

import { FETCH_POLLS, FETCH_SINGLE_POLL } from './types'

// get a user's polls
export const fetchMyPolls = () => async dispatch => {
  try {
    const res = await axios.get(`/api/mypolls`)

    dispatch({ type: FETCH_POLLS, payload: res.data })
  } catch (error) {
    console.log(error)
    // TODO: dispatch failed to fetchPolls / error handle
  }
}

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

export const fetchSinglePoll = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/polls/${id}`)

    // TODO: dispatch error when poll not found

    dispatch({ type: FETCH_SINGLE_POLL, payload: res.data })
  } catch (error) {
    console.log(error)
    // TODO: dispatch failed to fetchSinglePoll / error handle
  }
}

export const newPoll = ({ title, choices, history }) => async dispatch => {
  try {
    const res = await axios.post(
      '/api/polls',
      { title, choices: choices.split('\n') }
    )

    dispatch({ type: FETCH_SINGLE_POLL, payload: res.data })

    history.push(`/polls/${res.data._id}`)
  } catch (error) {
    console.log(error)
    // TODO: dispatch failed to create poll / error handle
  }
}

export const vote = (id, choice) => async dispatch => {
  if (!id || !choice) {
    throw new Error('Invalid vote')
  }
  try {
    const res = await axios.patch(`/api/polls/${id}`, { choice })

    dispatch({ type: FETCH_SINGLE_POLL, payload: res.data })
  } catch (error) {
    console.log(error)
    // TODO: Error handle
  }
}

export default {
  fetchPolls,
  fetchSinglePoll,
  newPoll
}
