import React from "react";
import { connect } from "react-redux";

import { attemptLogin, attemptLogout } from "../../actions/auth";

import AuthPanel from "./view";

class AuthPanelContainer extends React.Component {
  state = {
    password: "",
    username: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAttemptLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.dispatchAttemptLogin({ username, password });
  };

  handleAttemptLogout = e => {
    e.preventDefault();
    this.props.dispatchAttemptLogout();
  };

  render() {
    return (
      <AuthPanel
        authStatus={this.props.authStatus}
        username={this.state.username}
        password={this.state.password}
        onInputChange={this.handleInputChange}
        onAttemptLogin={this.handleAttemptLogin}
        onAttemptLogout={this.handleAttemptLogout}
      />
    );
  }
}

const mapStateToProps = state => ({
  authStatus: state.auth.status
});

const mapDispatchToProps = dispatch => ({
  dispatchAttemptLogin({ username, password }) {
    dispatch(attemptLogin({ username, password }));
  },
  dispatchAttemptLogout() {
    dispatch(attemptLogout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanelContainer);
