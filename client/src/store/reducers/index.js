import { SET_PASSWORDS, ADD_PASSWORD } from '../actions';

const initialState = {
  passwords: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PASSWORDS:
      return { ...state, passwords: payload };
    case ADD_PASSWORD:
      return { ...state, passwords: [payload, ...state.passwords] };
    default:
      return state;
  }
};

export default reducer;
