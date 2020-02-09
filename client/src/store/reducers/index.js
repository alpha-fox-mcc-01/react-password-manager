import {
  SET_PASSWORDS,
  ADD_PASSWORD,
  DELETE_PASSWORD,
  FILTER_PASSWORDS,
  SET_QUERY,
  EDIT_PASSWORD,
} from '../actions';

const initialState = {
  passwords: [],
  filteredPasswords: [],
  userQuery: '',
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PASSWORDS:
      return { ...state, passwords: payload };
    case ADD_PASSWORD:
      return { ...state, passwords: [payload, ...state.passwords] };
    case DELETE_PASSWORD:
      return {
        ...state,
        passwords: state.passwords.filter(password => password.id !== payload),
      };
    case FILTER_PASSWORDS:
      return {
        ...state,
        filteredPasswords: payload,
      };
    case SET_QUERY:
      return {
        ...state,
        userQuery: payload,
      };
    case EDIT_PASSWORD:
      const passwords = state.passwords.filter(
        password => password.id !== payload.id
      );
      return {
        ...state,
        passwords: [...passwords, payload],
      };
    default:
      return state;
  }
};

export default reducer;
