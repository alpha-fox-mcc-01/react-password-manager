import React from "react";
import { Link } from "react-router-dom";

import PasswordForm from "./PasswordForm";
export default function Sidebar() {
  return (
    <div id="sidebar-content">
      <img src={require("../images/menu-icon.png")} height="30" width="30" />
      <br />
      <PasswordForm aria-label="password-form-modal" />
      <div id="options-list">
        <Link to="/">
          <h6>
            <img
              src={require("../images/lock-icon.png")}
              height="30"
              width="30"
              className="options-list-image"
            />
            My Vault
          </h6>
        </Link>
      </div>
    </div>
  );
}
