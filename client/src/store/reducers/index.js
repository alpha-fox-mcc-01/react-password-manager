import {
  ADD_PASSWORD,
  RECEIVE_PASSWORDS,
  RECEIVE_SEARCH_PASSWORDS
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
    default:
      return initialState;
  }
}

export default passwordReducer;
