// authReducer - sets the current user in state
import { GET_CURRENT_USER } from '../actions/types'

const defaultUser = {
  username: 'Anonymous',
  anonymous: true,
  githubId: null,
  avatarUrl: null
}

export default (state = defaultUser, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload || false
    default:
      return state
  }
}
