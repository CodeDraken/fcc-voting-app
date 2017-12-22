import { FETCH_POLLS } from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_POLLS:
      return action.payload
    default:
      return state
  }
}
