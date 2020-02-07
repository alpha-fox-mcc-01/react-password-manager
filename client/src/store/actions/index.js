import db from "../../config/firestore";

export const SET_PASSWORDS = "SET_PASSWORDS";
export const SET_NEWPASSWORD = "SET_NEWPASSWORD";

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

export const fetchPasswords = currentUserId => {
  console.log("masuk action");
  return dispatch => {
    let query = db.collection("Passwords").where("userId", "==", currentUserId);
    query.get().then(result => {
      let passwords = [];
      result.forEach(doc => {
        let info = doc.data();
        let item = {
          id: doc.id,
          ...info
        };
        passwords.push(item);
      });
      console.log(passwords, 'ini passwords')
      dispatch(setPasswords(passwords));
    });
  };
};
