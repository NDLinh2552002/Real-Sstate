// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// let onlineUser = [];

// const addUser = (userId, socketId) => {
//   const userExists = onlineUser.find((user) => user.userId === userId);
//   if (!userExists) {
//     onlineUser.push({ userId, socketId });
//     console.log(`User added: ${userId}, socket: ${socketId}`);
//   } else {
//     console.log(`User already exists: ${userId}`);
//   }
// };

// const removeUser = (socketId) => {
//   onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
//   console.log(`User removed: socket: ${socketId}`);
// };

// const getUser = (userId) => {
//   return onlineUser.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   console.log(`New connection: socket: ${socket.id}`);

//   socket.on("newUser", (userId) => {
//     addUser(userId, socket.id);
//   });

//   socket.on("sendMessage", ({ receiverId, data }) => {
//     const receiver = getUser(receiverId);
//     if (receiver) {
//       io.to(receiver.socketId).emit("getMessage", data);
//       console.log(`Message sent to: ${receiverId}`);
//     } else {
//       console.log(`User not found: ${receiverId}`);
//     }
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//     console.log(`User disconnected: socket: ${socket.id}`);
//   });
// });

// io.listen(4000, () => {
//   console.log("Socket.io server is running on port 4000");
// });
import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`Kết nối mới: ${socket.id}`);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`Người dùng được thêm: ${userId}`);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Tin nhắn được gửi tới ${receiverId}`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`Người dùng ngắt kết nối: ${socket.id}`);
  });
});

io.listen(4000);
console.log("Server đang lắng nghe trên cổng 4000");