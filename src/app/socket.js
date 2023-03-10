const globalUser = new Map();

const initiaSocketAction = (socketServer) => {
  socketServer.on("connection", (socket) => {
    socket.on("add_user", (user) => {
      globalUser.set(user, socket.id);
      socketServer.sockets.emit("add_user", globalUser.size);
    });

    socket.on("remove_user", (user) => {
      globalUser.delete(user);
      console.log(globalUser);
      socketServer.sockets.emit("remove_user", globalUser.size);
    });

    socket.on("message", (info) => {
      console.log(globalUser);
      globalUser.forEach((user) => {
        socketServer.sockets.to(user).emit("message", info);
      })
      
    });
  });
};

module.exports = initiaSocketAction;
