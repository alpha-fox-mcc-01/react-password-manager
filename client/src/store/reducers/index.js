import {
  ADD_PASSWORD,
  RECEIVE_PASSWORDS,
  RECEIVE_SEARCH_PASSWORDS,
  DELETE_PASSWORD,
  EDIT_PASSWORD
} from "../actions/";

const initialState = {
  passwords: [],
  searchResultPasswords: [],
  loadingPasswords: false,
  errorPasswords: null
};

function passwordReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PASSWORD:
      return { ...state, passwords: [action.newPassword, ...state.passwords] };
    case RECEIVE_PASSWORDS:
      return { ...state, passwords: action.passwords };
    case RECEIVE_SEARCH_PASSWORDS:
      return { ...state, searchResultPasswords: action.results };
    case DELETE_PASSWORD:
      return {
        ...state,
        passwords: state.passwords.filter(password => password.id !== action.id)
      };
    case EDIT_PASSWORD:
      let getRidOfOld = state.passwords.filter(
        password => password.id !== action.id
      );
      let edited = { ...action.payload, id: action.id };
      return {
        ...state,
        passwords: [edited].concat(getRidOfOld)
      };
    default:
      return initialState;
  }
}

export default passwordReducer;
