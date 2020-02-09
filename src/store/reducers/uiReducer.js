import { SHOW_ADDFORM, SHOW_NOTIFICATION, SET_ISFETCHING } from '../actions/'

const initialState = {
  isShowingAddForm: false,
  isFetching: false,
  notifications: {},
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADDFORM:
      return {
        ...state,
        isShowingAddForm: action.payload,
      }
    case SET_ISFETCHING:
      return {
        ...state,
        isFetching: action.payload,
      }
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
      }

    default:
      return state
  }
}
