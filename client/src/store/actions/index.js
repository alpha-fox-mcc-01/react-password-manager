import db from "../../config/firestore";

// define types
export const RECEIVE_PASSWORDS = "RECEIVE_PASSWORDS";
export const ADD_PASSWORD = "ADD_PASSWORD";
export const RECEIVE_SEARCH_PASSWORDS = "RECEIVE_SEARCH_PASSWORDS";
export const DELETE_PASSWORD = "DELETE_PASSWORD";
export const EDIT_PASSWORD = "EDIT_PASSWORD";
export const SET_LOADING = "SET_LOADING";

// define creators
export const getPasswords = () => {
  return dispatch => {
    let passArr = [];
    db.collection("passwords")
      .where("user", "==", "5X16z6042w6hw2J9J3Ol")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          passArr.push({ ...doc.data(), id: doc.id });
        });
        dispatch(receivePasswords(passArr));
      });
  };
};

export const searchPasswords = keyword => {
  return (dispatch, getState) => {
    const { passwords } = getState();
    let filtered = passwords.filter(
      password =>
        password.login.toLowerCase().startsWith(keyword.toLowerCase()) ||
        password.url.toLowerCase().startsWith(keyword.toLowerCase())
    );
    dispatch(receiveSearchPasswords(filtered));
  };
};

export const receiveSearchPasswords = passwords => {
  return {
    type: RECEIVE_SEARCH_PASSWORDS,
    results: passwords
  };
};

export const receivePasswords = passwords => {
  return {
    type: RECEIVE_PASSWORDS,
    passwords
  };
};

export const requestAddPassword = data => {
  return dispatch => {
    db.collection("passwords")
      .add({
        ...data,
        user: "5X16z6042w6hw2J9J3Ol",
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then(docRef => {
        docRef.get().then(doc => {
          const record = { id: docRef.id, ...doc.data() }; // spread buat dapetin info record, tapi id gadapet dari doc.data() jadi harus gabungin manual
          dispatch(addPassword(record));
        });
      })
      .catch(err => {
        console.error("Error adding document; ", err);
      });
  };
};

export const addPassword = newPassword => {
  return {
    type: ADD_PASSWORD,
    newPassword
  };
};

export const requestDeletePassword = id => {
  return dispatch => {
    db.collection("passwords")
      .doc(id)
      .delete()
      .then(() => {
        dispatch(deletePassword(id));
      })
      .catch(err => {
        console.error("Error removing document:", err);
      });
  };
};

export const deletePassword = id => {
  return {
    type: DELETE_PASSWORD,
    id
  };
};

export const requestEditPassword = (id, payload) => {
  return dispatch => {
    db.collection("passwords")
      .doc(id)
      .set(
        {
          url: payload.url,
          login: payload.login,
          password: payload.password,
          updatedAt: new Date()
        },
        { merge: true }
      )
      .then(() => {
        dispatch(editPassword(id, payload));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const editPassword = (id, payload) => {
  return {
    type: EDIT_PASSWORD,
    id,
    payload
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
