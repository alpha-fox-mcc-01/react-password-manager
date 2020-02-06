import db from '../../config/firebase';

export const SET_PASSWORDS = 'SET_PASSWORDS';
export const ADD_PASSWORD = 'ADD_PASSWORD';

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
