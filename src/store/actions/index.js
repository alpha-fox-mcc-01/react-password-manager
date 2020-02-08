import db from '../../configs/firestore'

//

export const SET_MYPASSWORD = 'SET_MYPASSWORD'
export const ADD_PASSWORD = 'ADD_PASSWORD'

export const SET_LOWERCASE = 'SET_LOWERCASE'
export const SET_UPPERCASE = 'SET_UPPERCASE'
export const SET_SPCHAR = 'SET_SPCHAR'
export const SET_NUMBER = 'SET_NUMBER'
export const SET_VALIDLENGTH = 'SET_VALIDLENGTH'

export const SHOW_ADDFORM = 'SHOW_ADDFORM'
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const SET_ISFETCHING = 'SET_ISFETCHING'

export const setIsFetching = (value) => {
  return {
    type: SET_ISFETCHING,
    payload: value,
  }
}

export const showAddForm = (value) => {
  return {
    type: SHOW_ADDFORM,
    payload: value,
  }
}

export const setLowercase = (value) => {
  return {
    type: SET_LOWERCASE,
    payload: value,
  }
}
export const setUppercase = (value) => {
  return {
    type: SET_UPPERCASE,
    payload: value,
  }
}
export const setSpChar = (value) => {
  return {
    type: SET_SPCHAR,
    payload: value,
  }
}
export const setNumber = (value) => {
  return {
    type: SET_NUMBER,
    payload: value,
  }
}
export const setValidLength = (value) => {
  return {
    type: SET_VALIDLENGTH,
    payload: value,
  }
}

export const setMyPasswords = (passwords) => {
  return {
    type: SET_MYPASSWORD,
    payload: passwords,
  }
}
export const requestPasswords = (owner) => {
  const myPasswords = []
  return (dispatch) => {
    dispatch(setIsFetching(true))
    db.collection('passwords')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const row = {
            id: doc.id,
            ...doc.data(),
          }
          myPasswords.push(row)
        })
        dispatch(setMyPasswords(myPasswords))
        // finish fetching, change isFetching state to false
        dispatch(setIsFetching(false))
      })
  }
}

export const postPassword = (password) => {
  return (dispatch) => {
    // async here
    db.collection('passwords')
      .add(password)
      .then((docRef) => {
        dispatch(requestPasswords())
        dispatch(showAddForm(false))
      })
      .catch(console.log)
  }
}
