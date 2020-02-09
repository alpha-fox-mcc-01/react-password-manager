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
    
  

    await waitForElement(() => app.getAllByTestId("list-passwords"));
    fireEvent.click(app.queryByTestId("to-edit123"))
    // fireEvent.change(app.queryAllByTestId("editUsername-123"), username)
    // fireEvent.change(app.getAllByTestId("editPassword"), password)
    // fireEvent.change(app.getAllByTestId("editUrl"), url)
    
    await waitForElement(() => app.getAllByTestId("edit-password"));
    app.debug()
    fireEvent.click(app.getAllByTestId("submit-edit"))
    expect(app.queryByText(/tinypixeL1_/)).toBeInTheDocument()
  });