const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const dotenv = require("dotenv");
const connectDB = require("./database/db");


//NEW 
// console.log(process.env.MONGO_URI);
// Routes
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();
connectDB();

const app = express();
app.set("trust proxy", 1);

/* ============================= */
/* CORS CONFIGURATION */
/* ============================= */

app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://localhost:3000'
  ],
  credentials: true,   // ⭐ IMPORTANT
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));


/* ============================= */
/* SERVE STATIC FILES */
/* ============================= */

app.use('/frontend', express.static(path.join(__dirname, '../Frontend')));


/* ============================= */
/* MIDDLEWARE */
/* ============================= */

app.use(express.json());
app.use(logger);

app.use(cookieParser());

app.use(
  session({
    secret: "veloura-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly:true,
      sameSite:"lax",//changed
      secure:false
    }
  })
);
/* ============================= */
/* ROUTES */
/* ============================= */

app.use("/api", userRoutes);
app.use("/api", cartRoutes);
app.use("/api", contactRoutes);

/* ============================= */
/* DEFAULT ROUTE */
/* ============================= */

app.get("/", (req, res) => {
  res.send("API running...");
});

/* ============================= */

/* ERROR HANDLER (LAST) */

/* ============================= */

app.use(errorHandler);

/* ============================= */
/* START SERVER */
/* ============================= */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});