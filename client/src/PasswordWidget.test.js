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

test("Password widget validates 5 conditions", () => {

    const app = render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
    const initialValue = {
        target: {
            value: ""
        }
    }
    fireEvent.change(app.getByTestId("inputPassword"), initialValue)
    expect(app.queryByText(/has to contain 1 uppercase letter/)).toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 lowercase letter/)).toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 number/)).toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 special character/)).toBeInTheDocument()
    expect(app.queryByText(/must be longer than 5 characters/)).toBeInTheDocument()


    const anUppercase = {
        target: {
            value: "T"
        }
    }
    fireEvent.change(app.getByTestId("inputPassword"), anUppercase)
    expect(app.queryByText(/has to contain 1 uppercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 lowercase letter/)).toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 number/)).toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 special character/)).toBeInTheDocument()
    expect(app.queryByText(/must be longer than 5 characters/)).toBeInTheDocument()


    const withLowercase = {
        target: {
            value: "Tini"
        }
    }
    fireEvent.change(app.getByTestId("inputPassword"), withLowercase)
    expect(app.queryByText(/has to contain 1 uppercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 lowercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 number/)).toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 special character/)).toBeInTheDocument()
    expect(app.queryByText(/must be longer than 5 characters/)).toBeInTheDocument()

    const withNumber = {
        target: {
            value: "Tin1"
        }
    }
    fireEvent.change(app.getByTestId("inputPassword"), withNumber)
    expect(app.queryByText(/has to contain 1 uppercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 lowercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 number/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 special character/)).toBeInTheDocument()
    expect(app.queryByText(/must be longer than 5 characters/)).toBeInTheDocument()

    const withSpecial = {
        target: {
            value: "Ti1@"
        }
    }
    fireEvent.change(app.getByTestId("inputPassword"), withSpecial)
    expect(app.queryByText(/has to contain 1 uppercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 lowercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 number/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 special character/)).not.toBeInTheDocument()
    expect(app.queryByText(/must be longer than 5 characters/)).toBeInTheDocument()

    const Length = {
        target: {
            value: "Ti1@aa"
        }
    }
    fireEvent.change(app.getByTestId("inputPassword"), Length)
    expect(app.queryByText(/has to contain 1 uppercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 lowercase letter/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 number/)).not.toBeInTheDocument()
    expect(app.queryByText(/has to contain 1 special character/)).not.toBeInTheDocument()
    expect(app.queryByText(/must be longer than 5 characters/)).not.toBeInTheDocument()
})