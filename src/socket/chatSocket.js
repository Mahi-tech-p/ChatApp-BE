const registerChatHandlers = (
  io,
  socket
) => {

  // Join room
  socket.on("join_room", (room) => {

    socket.join(room);

    console.log(
      `${socket.id} joined ${room}`
    );

  });

  // Send message
  socket.on(
    "send_message",
    (data) => {

      console.log(data);

      io.to(data.room).emit(
        "receive_message",
        data
      );
    }
  );

};
export default registerChatHandlers;