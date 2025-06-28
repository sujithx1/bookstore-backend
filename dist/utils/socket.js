"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnection = void 0;
const app_1 = require("../app");
const socketConnection = () => {
    app_1.io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        //   socket.on('', (data) => {
        //     console.log('Message received:', data);
        //     io.emit('receive_message', data); 
        //   });
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
exports.socketConnection = socketConnection;
