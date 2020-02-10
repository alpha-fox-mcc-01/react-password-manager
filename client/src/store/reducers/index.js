import {
  ADD_PASSWORD,
  RECEIVE_PASSWORDS,
  RECEIVE_SEARCH_PASSWORDS,
  DELETE_PASSWORD,
  EDIT_PASSWORD,
  SET_LOADING
} from "../actions/";

const initialState = {
  passwords: [],
  searchResultPasswords: [],
  loadingPasswords: false,
  errorPasswords: null,
  isLoading: false
};

function passwordReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PASSWORD:
      return {
        ...state,
        passwords: [action.newPassword, ...state.passwords],
        isLoading: false
      };
    case RECEIVE_PASSWORDS:
      return { ...state, passwords: action.passwords, isLoading: false };
    case RECEIVE_SEARCH_PASSWORDS:
      return { ...state, searchResultPasswords: action.results };
    case DELETE_PASSWORD:
      return {
        ...state,
        passwords: state.passwords.filter(
          password => password.id !== action.id
        ),
        isLoading: false
      };
    case EDIT_PASSWORD:
      let getRidOfOld = state.passwords.filter(
        password => password.id !== action.id
      );
      let edited = { ...action.payload, id: action.id };
      return {
        ...state,
        passwords: [edited].concat(getRidOfOld),
        isLoading: false
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return initialState;
  }
}

export default passwordReducer;
