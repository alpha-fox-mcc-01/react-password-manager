import {
  SET_MYPASSWORD,
  SET_LOWERCASE,
  SET_UPPERCASE,
  SET_SPCHAR,
  SET_NUMBER,
  SET_VALIDLENGTH,
} from '../actions'

const initialState = {
  myPasswords: [],
  haveLowercase: false,
  haveUppercase: false,
  haveSpchar: false,
  haveNumber: false,
  haveValidLength: false,
}

export default function passwordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MYPASSWORD:
      return {
        ...state,
        myPasswords: action.payload,
      }
    case SET_LOWERCASE:
      return {
        ...state,
        haveLowercase: action.payload,
      }
    case SET_UPPERCASE:
      return {
        ...state,
        haveUppercase: action.payload,
      }
    case SET_NUMBER:
      return {
        ...state,
        haveNumber: action.payload,
      }
    case SET_SPCHAR:
      return {
        ...state,
        haveSpchar: action.payload,
      }
    case SET_VALIDLENGTH:
      return {
        ...state,
        haveValidLength: action.payload,
      }
    default:
      return state
  }
}
