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

test("Search should display Password Info based on keyword", () => {
    const app = render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )

    const keyword = {
        target: {
            value: 'classpass'
        }
    }
    fireEvent.change(app.queryByTestId("search-input"), keyword)
    
})  