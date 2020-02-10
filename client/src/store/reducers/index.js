import { SET_PASSWORDS, SET_NEWPASSWORD, SET_DELETEDPASSWORD, SET_EDITEDPASSWORD, SET_LOADING } from "../actions";

const initialState = {
  passwords: [],
  loading: false
};

function passwordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PASSWORDS:
      return { ...state,  loading: false, passwords: action.passwords };
    case SET_NEWPASSWORD:
      return { ...state, passwords: [...state.passwords, action.password] };
    case SET_DELETEDPASSWORD: 
      let newPasswords = state.passwords.filter( password => { return password.id !== action.passwordId })
      return {...state, passwords: newPasswords }
    case SET_EDITEDPASSWORD:
      let updatedPasswords =   state.passwords.filter( password => { return password.id !== action.payload.id })
      return { ...state, passwords: [...updatedPasswords, action.payload]}
    case SET_LOADING: 
      return {...state, loading: !state.loading}  
    default:
      return state;
  }
}

export default passwordReducer;
