import React from "react";
import { render, waitForElement } from "@testing-library/react";
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

test("Fetch password  should display list of passwords", async () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  await waitForElement(() => app.getAllByRole("listitem"));
  expect(app.queryByTestId("list-passwords").children.length).toBe(1)
});
