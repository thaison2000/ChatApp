const io = require("socket.io")(3003, {
    cors: {
      origin: "*",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    if(users.some((user) => user.userId == userId)){
      users = users.filter((user)=> user.userId != userId)
      users.push({ userId, socketId })
      console.log(users)
    }
    else{
      users.push({ userId, socketId });
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
    socket.on("sendMessage", ({ sendUserId, content, sendUserName }) => {
      io.emit("getMessage", {
        sendUserName,
        sendUserId,
        content,
      });
    });

    socket.on("sendNotification", ({ sendUserName, sendUserId, receiveUserId, type, post }) => {
      const receiver = getUser(receiveUserId);
      console.log(typeof(receiveUserId))
      console.log(type)
      if(receiver){
      io.to(receiver.socketId).emit("getNotification", {
        sendUserId,
        sendUserName,
        receiveUserId,
        type,
        post,
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