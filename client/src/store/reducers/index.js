import { ADD_PASSWORD, RECEIVE_PASSWORDS } from '../actions/'

const initialState = {
    passwords: [],
    searchResultPassword: {},
    loadingPasswords: false,
    errorPasswords: null
}

function passwordReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PASSWORD:
            return {...state, passwords: [action.newPassword, ...state.passwords]}
        case RECEIVE_PASSWORDS:
            return {...state, passwords: action.passwords}
        default: 
            return initialState
    }
}

export default passwordReducer