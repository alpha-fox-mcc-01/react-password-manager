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

test("Edit password should return password info with updated value", async () => {
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
          value: 'tinypixeL1_'
      }
    }
    
  

    await waitForElement(() => app.getAllByTestId("list-passwords")[0]);
    fireEvent.click(app.queryByTestId("to-edit123"))
    expect(app.queryAllByText(/URL/)[0]).toBeInTheDocument()
    expect(app.queryAllByText(/Username/)[0]).toBeInTheDocument()
    expect(app.queryAllByText(/Password/)[0]).toBeInTheDocument()
    app.debug()
    fireEvent.change(app.queryAllByTestId("editUsername")[0], username)
    // fireEvent.change, username)
    fireEvent.change(app.getAllByTestId("editPassword")[0], password)
    fireEvent.change(app.getAllByTestId("editUrl")[0], url)
    
    fireEvent.click(app.getAllByTestId("submit-edit")[0])
    await waitForElement(() => app.getAllByTestId("edit-password"));
    // app.debug()
    expect(app.queryByText(/tinypixeL1_/)).toBeInTheDocument()
  });