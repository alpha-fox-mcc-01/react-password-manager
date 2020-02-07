import db from '../../config/firestore';

export const SET_PASSWORDS = 'SET_PASSWORDS';
export const ADD_PASSWORD = 'ADD_PASSWORD';
export const DELETE_PASSWORD = 'DELETE_PASSWORD';
export const FILTER_PASSWORDS = 'FILTER_PASSWORDS';
export const SET_QUERY = 'SET_QUERY';

export const addPasswords = passwords => {
  return {
    type: SET_PASSWORDS,
    payload: passwords,
  };
};

export const requestPasswords = () => {
  return dispatch => {
    db.collection('passwords')
      .get()
      .then(querySnapshot => {
        const passwords = [];
        querySnapshot.forEach(doc => {
          const password = { id: doc.id, ...doc.data() };
          passwords.push(password);
        });
        dispatch(addPasswords(passwords));
      });
  };
};

export const addPassword = password => {
  return {
    type: ADD_PASSWORD,
    payload: password,
  };
};

export const requestAddPassword = password => {
  return dispatch => {
    db.collection('passwords')
      .add({
        url: password.url,
        login: password.login,
        password: password.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then(function(docRef) {
        docRef.get().then(doc => {
          const password = { id: docRef.id, ...doc.data() };
          dispatch(addPassword(password));
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
};

export const deletePassword = id => {
  return {
    type: DELETE_PASSWORD,
    payload: id,
  };
};

export const requestDeletePassword = id => {
  return dispatch => {
    db.collection('passwords')
      .doc(id)
      .delete()
      .then(function() {
        dispatch(deletePassword(id));
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  };
};

export const registerUser = user => {
  return dispatch => {
    db.collection('users')
      .add({
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then(function(docRef) {
        docRef.get().then(doc => {
          const password = { id: docRef.id, ...doc.data() };
          dispatch(addPassword(password));
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
};

export const requestFilterPasswords = query => {
  return (dispatch, getState) => {
    const { passwords } = getState();
    const filtered = passwords.filter(
      password =>
        password.login.toLowerCase().startsWith(query.toLowerCase()) ||
        password.url.toLowerCase().startsWith(query.toLowerCase())
    );
    dispatch(filterPasswords(filtered));
  };
};

export const filterPasswords = filteredPasswords => {
  return {
    type: FILTER_PASSWORDS,
    payload: filteredPasswords,
  };
};

export const setQuery = query => {
  return {
    type: SET_QUERY,
    payload: query,
  };
};
