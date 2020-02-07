import db from "../../config/firebase";

// define types
export const RECEIVE_PASSWORDS = "RECEIVE_PASSWORDS";
export const ADD_PASSWORD = "ADD_PASSWORD";
export const RECEIVE_SEARCH_PASSWORDS = "RECEIVE_SEARCH_PASSWORDS";

// define creators
export const getPasswords = () => {
  return dispatch => {
    let passArr = [];
    db.collection("passwords")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          passArr.push({ ...doc.data(), id: doc.id });
        });
        dispatch(receivePasswords(passArr));
      });
  };
};

export const searchPasswords = (passwords, keyword) => {
  return {
    type: RECEIVE_SEARCH_PASSWORDS,
    results: passwords.filter(
      password =>
        password.username.startsWith(keyword) ||
        password.url.startsWith(keyword)
    )
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
