import { SET_PASSWORDS, SET_NEWPASSWORD } from "../actions";

const initialState = {
  passwords: []
};

function passwordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PASSWORDS:
      return { ...state, passwords: action.passwords };
    case SET_NEWPASSWORD: 
      return {...state, passwords: [...state.passwords, action.password]}
    default:
      return state;
  }
}

export default passwordReducer;
