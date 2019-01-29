import React, { Component } from 'react';
import { VERIFY_USER } from "../Events";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      error: ""
    };
  }

  setUser = ({ user, isUser }) => {
    // prints out the user object
    console.log(user, isUser);
    // if the username is taken, throw an error at the user
    if(isUser){
      this.setError("Username taken")
    } else {
      // otherwise, let the user enjoy their username
      this.props.setUser(user);
      this.setError("");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname, this.setUser);
  }

  handleChange = (e) => {
    this.setState({ nickname: e.target.value })
  }

  setError = (error) => {
    this.setState({ error });
  }

  render() {
    const { nickname, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">

          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <input
            ref={(input) => { this.textInput = input }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder={'My Cool Username!'}
          />
          <div className="error">{error ? error : null}</div>
          {/* if Error, print out error, otherwise do null, nuthin, nada, badabing, badaboom */}
        </form>
      </div>
    );
  }
}