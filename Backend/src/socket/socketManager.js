/**
 * Socket Manager - singleton that holds the Socket.io instance
 * and tracks which socket IDs belong to which userId.
 */

let io = null;
// Map<userId (string), Set<socketId (string)>>
const userSockets = new Map();

const initSocketManager = (socketIO) => {
  io = socketIO;
};

const getIO = () => io;

const registerSocket = (userId, socketId) => {
  const id = userId.toString();
  if (!userSockets.has(id)) {
    userSockets.set(id, new Set());
  }
  userSockets.get(id).add(socketId);
};

const removeSocket = (userId, socketId) => {
  const id = userId.toString();
  if (userSockets.has(id)) {
    userSockets.get(id).delete(socketId);
    if (userSockets.get(id).size === 0) {
      userSockets.delete(id);
    }
  }
};

const emitToUser = (userId, event, data) => {
  if (!io) return;
  const id = userId.toString();
  const sockets = userSockets.get(id);
  if (sockets && sockets.size > 0) {
    sockets.forEach((socketId) => {
      io.to(socketId).emit(event, data);
    });
  }
};

module.exports = {
  initSocketManager,
  getIO,
  registerSocket,
  removeSocket,
  emitToUser
};
