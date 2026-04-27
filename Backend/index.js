const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');            // 👈 ADD
const socketIo = require('socket.io');   // 👈 ADD

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const dotenv = require("dotenv");
const connectDB = require("./database/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contactRoutes");

require("dotenv").config();
connectDB();

const app = express();
const server = http.createServer(app);   

/* ============================= */
/* SOCKET.IO SETUP */
/* ============================= */

const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

/* SOCKET CONNECTION */
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('add-to-cart', (data) => {
    console.log('Cart event:', data);
    io.emit('cart-updated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

/* ============================= */
/* CORS */
/* ============================= */

app.use(cors());

/* ============================= */
/* STATIC FILES */
/* ============================= */

app.use('/frontend', express.static(path.join(__dirname, '../Frontend')));

/* ============================= */
/* MIDDLEWARE */
/* ============================= */

app.use(express.json());
app.use(logger);

/* ============================= */
/* API ROUTES */
/* ============================= */

app.use("/api", userRoutes);
app.use("/api", cartRoutes);
app.use("/api", contactRoutes);

/* ============================= */
/* DEFAULT ROUTE */
/* ============================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/html/main.html")); 
});

/* ============================= */
/* ERROR HANDLER */
/* ============================= */

app.use(errorHandler);

/* ============================= */
/* START SERVER */
/* ============================= */

server.listen(3000, () => {   
  console.log("Server running on http://localhost:3000");
});