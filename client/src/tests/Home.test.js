import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getByText
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter as Router } from "react-router-dom";

import App from "../App";

const dbMock = require("../config/firestore");
jest.mock("../config/firebase.js", () => ({}));
jest.mock("../config/firestore.js", () => {
  return {
    collection: collectionName => {
      return {
        where: (fieldName, operator, value) => {
          return {
            get: () => {
              return new Promise((resolve, reject) => {
                resolve([
                  {
                    id: 1,
                    data: () => {
                      return {
                        url: "http://hacktiv8.com",
                        login: "agung",
                        password: "qwerty12345",
                        createdAt: "",
                        updatedAt: "",
                        user: "5X16z6042w6hw2J9J3Ol"
                      };
                    }
                  },
                  {
                    id: 2,
                    data: () => {
                      return {
                        url: "http://google.com",
                        login: "jimmy",
                        password: "rahasia",
                        createdAt: "",
                        updatedAt: "",
                        user: "5X16z6042w6hw2J9J3Ol"
                      };
                    }
                  }
                ]);
              });
            }
          };
        },
        add: newPassword => {
          return new Promise((resolve, reject) => {
            resolve({
              get: () => {
                return new Promise((resolve, reject) => {
                  resolve({
                    id: 3,
                    data: () => {
                      return {
                        url: newPassword.url,
                        login: newPassword.login,
                        password: newPassword.password,
                        createdAt: "",
                        updatedAt: "",
                        user: "5X16z6042w6hw2J9J3Ol"
                      };
                    }
                  });
                });
              }
            });
          });
        },
        doc: id => {
          return {
            set: object => {
              return new Promise((resolve, reject) => {
                resolve();
              });
            }
          };
        }
      };
    }
  };
});

test("Home page working properly", async () => {
  const app = render(
    <Router>
      <App />
    </Router>
  );

  expect(app.queryByTestId("search-bar-input")).toBeInTheDocument();
  expect(app.queryByTestId("password-form-modal")).toBeInTheDocument();
  expect(app.queryByTestId("passwords-list")).toBeInTheDocument();

  // Fetching passwords test ===============================
  await waitForElement(() => app.getAllByRole("listitem"));
  expect(app.queryByTestId("passwords-list").children.length).toBe(2);

  // Add new password record test ==================================

  fireEvent.click(app.getByText(/Create New/)); // Keluarin formnya yang berupa modal
  expect(app.queryByText(/New Password/)).toBeInTheDocument(); // Check buat form modal header
  expect(app.queryAllByText(/URL/i)[0]).toBeInTheDocument(); // Check buat field url
  expect(app.queryByText(/Login/i)).toBeInTheDocument(); // Check buat field username/email
  expect(app.queryByText(/never share/)).toBeInTheDocument(); // Check buat field password
  expect(app.queryByText(/Password Strength/)).toBeInTheDocument(); // Check buat strength validator
  expect(app.queryAllByText(/Create/)[1]).toBeInTheDocument(); // Check buat button submit

  const url = {
    target: {
      value: "tokopedia.com"
    }
  };

  const login = {
    target: {
      value: "leroy12345"
    }
  };

  // Password strength test dulu ===================================
  const noneFulfilled = {
    target: {
      value: ""
    }
  };
  fireEvent.change(app.queryByTestId("password-input"), noneFulfilled); // semuanya error
  expect(
    app.queryByText(/should have at least one upper-case/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one lower-case/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should be longer than 5 characters/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one number/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one special character/)
  ).toBeInTheDocument();

  const lowerCase = {
    target: {
      value: "ubunt"
    }
  };
  fireEvent.change(app.queryByTestId("password-input"), lowerCase); // lowercase gak error
  expect(
    app.queryByText(/should have at least one lower-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one upper-case/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should be longer than 5 characters/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one number/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one special character/)
  ).toBeInTheDocument();

  const upperCase = {
    target: {
      value: "Ubunt"
    }
  };
  fireEvent.change(app.queryByTestId("password-input"), upperCase); // uppercase gak error
  expect(
    app.queryByText(/should have at least one upper-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one lower-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should be longer than 5 characters/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one number/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one special character/)
  ).toBeInTheDocument();

  const length = {
    target: {
      value: "Ubuntu"
    }
  };
  fireEvent.change(app.queryByTestId("password-input"), length); // length gak error
  expect(
    app.queryByText(/should have at least one upper-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one lower-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should be longer than 5 characters/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one number/)
  ).toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one special character/)
  ).toBeInTheDocument();

  const number = {
    target: {
      value: "Ubuntu2"
    }
  };
  fireEvent.change(app.queryByTestId("password-input"), number); // number gak error
  expect(
    app.queryByText(/should have at least one upper-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one lower-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should be longer than 5 characters/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one number/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one special character/)
  ).toBeInTheDocument();

  const symbol = {
    target: {
      value: "Ubuntu#2"
    }
  };
  fireEvent.change(app.queryByTestId("password-input"), symbol); // symbol gak error, status ok
  expect(
    app.queryByText(/should have at least one upper-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one lower-case/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should be longer than 5 characters/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one number/)
  ).not.toBeInTheDocument();
  expect(
    app.queryByText(/should have at least one special character/)
  ).not.toBeInTheDocument();
  expect(app.queryByText(/ok/i)).toBeInTheDocument();
  const password = {
    target: {
      value: "asdidD3$w"
    }
  };

  fireEvent.change(app.queryByTestId("url-input"), url); // set url
  fireEvent.change(app.queryByTestId("login-input"), login); // set login name info
  fireEvent.change(app.queryByTestId("password-input"), password); // set password
  fireEvent.click(app.getByTestId("add-submit-btn")); // Keluarin formnya yang berupa modal

  // seharusnya yang baru ke-append
  await waitForElement(() => app.getAllByRole("listitem"));
  expect(app.queryByTestId("passwords-list").children.length).toBe(3);
  expect(app.queryByText("leroy12345")).toBeInTheDocument();

  // Edit test =================================================
  fireEvent.click(app.getAllByTestId("dummy-password-card")[0]); // Harusnya keluarin form edit beserta passwordnya
  expect(app.queryByText(/Edit/)).toBeInTheDocument();
  expect(app.queryByText(/Update/)).toBeInTheDocument();
  expect(app.queryByText(/Password Strength/)).toBeInTheDocument();
  expect(app.queryByText(/URL/)).toBeInTheDocument();
  expect(app.queryByText(/Login/)).toBeInTheDocument();
  expect(app.queryByText("Password")).toBeInTheDocument();
  login.target.value = "agungcool";
  fireEvent.change(app.queryByTestId("edit-login-input"), login);
  fireEvent.click(app.getByTestId("edit-submit-btn"));
  await waitForElement(() => app.getAllByRole("listitem"));
  expect(app.queryByText("agungcool")).toBeInTheDocument(); // Harusnya namanya udah ganti

  // Delete test ===============================================

  // Search feature test =======================================
  const keyword = {
    target: {
      value: "jimmy"
    }
  };
  fireEvent.change(app.queryByTestId("search-bar-input"), keyword); // set keyword/query
  expect(app.queryByText(/jimmy/)).toBeInTheDocument(); // Harusnya password jimmy ditampilin
  expect(app.queryByText(/agung/)).not.toBeInTheDocument(); // Harusnya password agung gak ditampilin
  expect(app.queryByText("leroy")).not.toBeInTheDocument(); // Harusnya password leroy gak ditampilin
});
