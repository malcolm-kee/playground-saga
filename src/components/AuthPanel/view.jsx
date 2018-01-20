import "./style.css";

import React from "react";

import { AuthStatus } from "../../constants";

const AuthPanel = ({
  authStatus,
  username,
  password,
  onInputChange,
  onAttemptLogin,
  onAttemptLogout
}) => (
  <div id="authPanel">
    <h1 className="panel-header">AuthPanel</h1>
    <div className="panel-info">
      <p>Auth Status: {authStatus}</p>
    </div>
    {authStatus === AuthStatus.ANONYMOUS && (
      <form className="authForm">
        <div className="authInputGroup">
          <input
            id="authUsername"
            className="authInput"
            type="text"
            name="username"
            value={username}
            onChange={onInputChange}
            required
          />
          <label htmlFor="authUserName">Username</label>
        </div>
        <div className="authInputGroup">
          <input
            id="authPassword"
            className="authInput"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            required
          />
          <label htmlFor="authPassword">Password</label>
        </div>
        <button onClick={onAttemptLogin} className="authButton">
          Dispatch Attempt Login
        </button>
      </form>
    )}
    {authStatus === AuthStatus.LOGGED_IN && (
      <form className="authForm">
        <button onClick={onAttemptLogout} className="authButton">
          Dispatch Attempt Logout
        </button>
      </form>
    )}
  </div>
);

export default AuthPanel;
