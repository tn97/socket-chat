import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED } from "../Events";
import LoginForm from "../Login"
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

  initSocket = () => {
    const socket = io(socketUrl);

    socket.on('connect', () => {
      console.log("connected");
    })
    this.setState({ socket });
  }

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED), user;
    this.setState({ user });
  }

  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    setState({ user:null });
  }
  render() {
    const { title } = this.props;
    return (
      <div className="container">
        <LoginForm socket={socket} setUser={this.setUser}/>
      </div>
    );
  }
}