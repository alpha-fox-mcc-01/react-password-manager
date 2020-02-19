import db from "../../config/firestore";


export const SET_PASSWORDS = "SET_PASSWORDS";
export const SET_NEWPASSWORD = "SET_NEWPASSWORD";
export const SET_DELETEDPASSWORD = "SET_DELETEDPASSWORD"
export const SET_EDITEDPASSWORD = "SET_EDITEDPASSWORD"
export const SET_LOADING = "SET_LOADING"
export const SET_ERROR = "SET_ERROR"


export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}

export const setError = () => {
  return {
    type: SET_ERROR
  }
}
export const setPasswords = passwords => {
  return {
    type: SET_PASSWORDS,
    passwords
  };
};

export const setNewPassword = password => {
  return {
    type: SET_NEWPASSWORD,
    password
  };
};

export const setEditedPassword = payload => {
  
  return {
    type: SET_EDITEDPASSWORD,
    payload
  }
}

export const setDeletedPassword = passwordId => {
  return {
    type: SET_DELETEDPASSWORD,
    passwordId
  }
}

export const addPassword = payload => {
  return dispatch => {
    db.collection("Passwords")
      .add({
        url: payload.url,
        username: payload.username,
        password: payload.password,
        userId: "test123",
        createdAt: new Date()
      })
      .then(docRef => {
        docRef.get().then(doc => {
          const newPassword = { id: docRef.id, ...doc.data() };
          dispatch(setNewPassword(newPassword))
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const deletePassword = id=> {
  return dispatch => {
    db.collection("Passwords")
      .doc(`${id}`)
      .delete()
      .then( _ => {
        dispatch(setDeletedPassword(id))
      })
      .catch(err => {
        console.log(err);
      });
  }
}


export const editPasswords = payload => {
  return dispatch => {
    db.collection("Passwords")
      .doc(`${payload.id}`)
      .set({
        url: payload.url,
        username: payload.username,
        password: payload.password,
        updatedAt: new Date(),
        userId: "test123"
      })
      .then(_ => {
        dispatch(setEditedPassword(payload))
      })
      .catch(err => {
        console.log(err);
      });
  }
}
export const fetchPasswords = currentUserId => {

  return dispatch => {
    dispatch(setLoading())
    let query = db.collection("Passwords").where("userId", "==", currentUserId);
    query.get()
    .then(result => {
      let passwords = [];
      result.forEach(doc => {
        let info = doc.data();
        let item = {
          id: doc.id,
          ...info
        };
        passwords.push(item);
      });

      dispatch(setPasswords(passwords));
    });
 
   
  };
};
