import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter as Router } from "react-router-dom";

import App from "../App";

test("App should render", () => {
  const app = render(
    <Router>
      <App />
    </Router>
  );
});
