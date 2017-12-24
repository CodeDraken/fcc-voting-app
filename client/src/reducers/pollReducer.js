import { FETCH_POLLS, FETCH_SINGLE_POLL } from '../actions/types'

// polls an object
// { page: 0, polls: [{}] }
export default (state = null, action) => {
  switch (action.type) {
    case FETCH_POLLS:
      return state
        ? { ...state, ...action.payload }
        : action.payload
    case FETCH_SINGLE_POLL:
      return state
        ? { ...state, polls: [ ...state.polls, action.payload ] }
        : { page: 0, polls: [ action.payload ] }
    default:
      return state
  }
}
