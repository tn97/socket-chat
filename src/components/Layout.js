import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT } from "../Events";
import LoginForm from "./LoginForm"

const socketUrl = "" // this will be the heroku link, with port 3231
export default class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  // initialize the socket
  initSocket = () => {
    const socket = io(socketUrl);

    socket.on('connect', () => {
      console.log("connected");
    })
    this.setState({ socket });
  }

  // sets the user property in state
  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED), user;
    this.setState({ user });
  }

  // sets the user property in state to null
  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    setState({ user:null });
  }
  render() {
    const { title } = this.props;
    const { socket } = this.state;
    return (
      <div className="container">
        <LoginForm socket={socket} setUser={this.setUser}/>
      </div>
    );
  }
}