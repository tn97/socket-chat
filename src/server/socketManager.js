const io = require("./index.js").io;
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require("../Events");
const { createUser, createMessage, createChat } = require("../Factories");

let connectedUsers = {};

module.exports = (socket) => {
  console.log(`Socket ID: ${socket.id}`);

  // verify username
  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null })
    } else {
      callback({ isUser: false, user: createUser({ name: nickname }) })
    }
  })

  // user connects with username
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    // broadcasts when a user connects
    io.emit(USER_CONNECTED, connectedUsers);
    console.log(connectedUsers);
  })
}

function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

function isUser(userList, username) {
  return username in userList
}