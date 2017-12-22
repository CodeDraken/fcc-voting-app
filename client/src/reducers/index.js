import { combineReducers } from 'redux'

import auth from './authReducer'
import polls from './pollReducer'

// root reducer
export default combineReducers({
  auth,
  polls
})
