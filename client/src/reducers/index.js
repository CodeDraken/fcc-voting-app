import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'

import auth from './authReducer'
import polls from './pollReducer'

// root reducer
export default combineReducers({
  auth,
  polls,
  form: reduxForm
})
