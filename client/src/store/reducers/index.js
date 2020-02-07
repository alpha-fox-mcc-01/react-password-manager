import { SET_PASSWORDS, SET_NEWPASSWORD, SET_DELETEDPASSWORD } from "../actions";

const initialState = {
  passwords: []
};

function passwordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PASSWORDS:
      return { ...state, passwords: action.passwords };
    case SET_NEWPASSWORD:
      return { ...state, passwords: [...state.passwords, action.password] };
    case SET_DELETEDPASSWORD: 
      let newPasswords = state.passwords.filter( password => { return password.id !== action.passwordId })
      return {...state, passwords: newPasswords }
    default:
      return state;
  }
}

export default passwordReducer;
