import React, { useState, useEffect } from "react";
import { addPassword } from '../../store/actions'
import { useDispatch } from "react-redux";
export function PasswordContainer() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUppercase, setUppercase] = useState(false)
  const [length, setLength] = useState(false)
  const [isLowercase, setLowercase] = useState(false)
  const [hasNumber, setNumber] = useState(false)
  const [hasSpecial, setSpecial] = useState(false)
  const dispatch = useDispatch();

  const handleFormSubmit = event => {
    event.preventDefault();
    let payload = {
      url,
      username,
      password
    };
    dispatch(addPassword(payload));
    setUrl("");
    setUsername("");
    setPassword("");
  };




  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };


  useEffect(() => {
    if (password.length >= 5) {
      setLength(true)
    } else {
      setLength(false)
    }
    if (new RegExp(/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/).test(password)) {
      setSpecial(true)
    } else {
      setSpecial(false)
    }
    if (password.toLowerCase() !== password) {
      setUppercase(true)
    } else { 
      setUppercase(false) 
    }
    if (password.toUpperCase() !== password) {
      setLowercase(true)
    } else {
      setLowercase(false)
    }
    if (new RegExp("[0-9]").test(password)) {
      setNumber(true)
    } else {
      setNumber(false)
    }

  }, [password])

  const styles = {
    margin: "0 auto"
  };

  return (
    <>
      <div data-testid="form-password"
        style={styles}
        className="w-full rounded-sm px-6 pt-6 pb-8 mb-4 flex flex-col my-2"
      >
        <div style={styles} className="md:w-1/2 -mx-3 md:flex mb-6 rounded-sm">
          <div className="md:w-full rounded-sm">
            <form data-testid="input-form" onSubmit={handleFormSubmit}>
              <label>URL</label>
              <input data-testid="inputUrl"
                value={url}
                onChange={handleUrlChange}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded"
                id="grid-first-name"
                type="text"
                placeholder="e.g. Google.com, Facebook.com"
              />
              <label>Username</label>
              <input data-testid="inputUsername"
                value={username}
                onChange={handleUsernameChange}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded"
                id="grid-first-name"
                type="text"
                placeholder="Type in your handle"
              />
              <label>Password</label>
              <input data-testid="inputPassword"
                value={password}
                onChange={handlePasswordChange}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded"
                id="grid-first-name"
                type="text"
                placeholder="Type in your password"
              />
              {
                !isUppercase && (
                  <p className="text-red text-xs italic">
                  Password has to contain 1 uppercase letter
                </p>
                )
              }
              {
                !isLowercase && (
                  <p className="text-red text-xs italic">
                  Password has to contain 1 lowercase letter
                </p>
                )
              }
              {
                !hasNumber && (
                  <p className="text-red text-xs italic">
                  Password has to contain 1 number
                </p>
                )
              }
              {
                !hasSpecial && (
                  <p className="text-red text-xs italic">
                  Password has to contain 1 special character
                </p>
                )
              }
              {
                !length && (
                  <p className="text-red text-xs italic">
                  Password must be longer than 5 characters
                </p>
                )
              }
              {
                isLowercase && isUppercase && length && hasNumber && hasSpecial && <button data-testid="submit-button" type="Submit">Save</button>
              }
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordContainer;
