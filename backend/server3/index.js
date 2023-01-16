const io = require("socket.io")(3003, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (userId != null) {
    if (users.some((user) => user.userId == userId)) {
      users = users.filter((user) => user.userId != userId)
      users.push({ userId, socketId })
      console.log(users)
    }
    else {
      users.push({ userId, socketId });
    }
  }

};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId != socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId == userId);
};

io.on("connection", (socket) => {

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ sendUserId, content, sendUserName,type, groupId }) => {
    console.log(content)
    console.log(users)
    io.emit("getMessage", {
      sendUserName,
      sendUserId,
      content,
      type,
      groupId
    });
  });

  socket.on("sendNotification", ({ sendUserName, sendUserId, receiveUserId, type, post, affectedUserName, groupName, groupId }) => {
    const receiver = getUser(receiveUserId);
    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        sendUserId,
        sendUserName,
        receiveUserId,
        type,
        post,
        groupId,
        timestamp: new Date()
      })
    }
    else {
      io.emit("getNotification", {
        sendUserId,
        sendUserName,
        receiveUserId,
        type,
        post,
        affectedUserName,
        groupName,
        groupId,
        timestamp: new Date()
      })
    }
  });

  //when disconnect
  socket.on("disconnected", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});