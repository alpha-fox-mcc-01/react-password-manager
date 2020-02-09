import { combineReducers } from 'redux'

import password from './passwordsReducer'
import ui from './uiReducer'

export default combineReducers({
  password,
  ui,
})
