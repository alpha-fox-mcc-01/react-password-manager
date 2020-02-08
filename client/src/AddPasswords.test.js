import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

jest.mock("./config/firebase", () => {
  return {};
});

jest.mock("./config/firestore", () => {
  const firestoreMock = require("./helpers/firestoreMock");
  return firestoreMock;
});

test("Add Password works well", async () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  const username = {
      target: {
          value: 'vania'
      }
  }

  const url = {
      target: {
          value: 'google'
      }
  }

  const password = {
    target: {
        value: '1111'
    }
  }
  
  fireEvent.change(app.getByTestId("inputUsername"), username)
  fireEvent.change(app.getByTestId("inputPassword"), password)
  fireEvent.change(app.getByTestId("inputUrl"), url)

  fireEvent.submit(app.getByTestId("input-form"))

  await waitForElement(() => app.getAllByRole("listitem"))
  expect(app.queryByTestId("list-passwords").children.length).toBe(4)
  expect(app.queryByTestId("list-passwords")).toHaveTextContent(username.target.value);

});
