import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
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
                        password: "qwerty12345",
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
                        url: "http://yahoo.com",
                        login: "johnny",
                        password: "helloworld",
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

  expect(app.queryByTestId("password-search-bar")).toBeInTheDocument();
  expect(app.queryByTestId("password-form-modal")).toBeInTheDocument();
  expect(app.queryByTestId("passwords-list")).toBeInTheDocument();

  await waitForElement(() => app.getAllByRole("listitem"));
  expect(app.queryByTestId("password-table").children.length).toBe(2);
});
