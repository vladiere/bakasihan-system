require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: true,
    origins: [process.env.FRONTEND_ORIGIN],
}); // Add this line
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true // Allow credentials (optional)
}));
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message,
    });
});


// Handle basic HTTP requests

// Handle WebSocket connections
io.on('connection', (socket) => {
    // Joining a room
    socket.on('joinAdminOrderRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('messageAdminOrder', (data) => {
        const { room, message } = data;
        console.log(`Message received in room ${room}: ${message}`);

        // Send the message to everyone in the room, including the sender
        io.in(room).emit('messageFromUser', message);
    });

    //User Room
    socket.on('joinUserOrderRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        // Notify others in the room that a new user has joined
    });

    socket.on('messageUserOrder', (data) => {
        const { room, message } = data;
        console.log(`Message received in room ${room}: ${message}`);

        // Send the message to everyone in the room, including the sender
        io.in(room).emit('messageFromAdmin', message);
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.SOCKET_PORT
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});
