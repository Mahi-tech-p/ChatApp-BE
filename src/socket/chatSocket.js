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
    async (data) => {

      console.log(data);
      try {
        const newMessage =
          await Message.create({
            sender: data.sender,
            room: data.room,
            message: data.message,
            time: data.time,
          });
        io.to(data.room).emit(
          "receive_message",
          data
        );
      } catch (error) {
        console.error(
          "Error saving message:",
          error
        );
      }


    }
  );

};
export default registerChatHandlers;