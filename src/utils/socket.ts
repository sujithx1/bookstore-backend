import { io } from "../app"

export const socketConnection=()=>{

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

//   socket.on('', (data) => {
//     console.log('Message received:', data);
//     io.emit('receive_message', data); 
//   });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

}