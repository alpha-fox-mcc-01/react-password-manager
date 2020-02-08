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

// jest.mock("sweetalert2", () => {
//   return {
//     Swal: {
//       fire : () => {
//         Sweetalert : {
//           return new Promise((resolve, reject
//         })
//       }
//     }
//   }
// })

test("Delete password should return id", async () => {
  const app = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  app.debug()
  await waitForElement(() => app.getAllByRole("listitem"));
  fireEvent.click(app.queryByTestId("delete-button-123"))

  
  


});
