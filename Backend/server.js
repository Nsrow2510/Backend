const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

/* CORS CONFIGURATION */
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));


/* HANDLE PREFLIGHT REQUESTS */
// app.options('*', cors());

/* JSON PARSER */
app.use(express.json());

/* DATABASE FILE */
const DB_PATH = path.join(__dirname, 'db.json');


/* HELPER FUNCTIONS */

function getUsers() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [] }, null, 2));
  }
  const data = fs.readFileSync(DB_PATH, 'utf8');
  const parsed = JSON.parse(data);
  return parsed.users || [];
}


function saveUsers(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users }, null, 2));
}


/* REGISTER API */

app.post('/register', (req, res) => {
//   console.log("Register endpoint hit");

  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const users = getUsers();

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(409).json({
      message: "Email already registered"
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    mobile,
    password
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({
    message: "Account created successfully",
    user: newUser
  });

});


/* LOGIN API */

app.post('/login', (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required."
    });
  }

  const users = getUsers();

  // Check if email exists
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({
      message: "Account not registered. Please sign up first."
    });
  }

  // Check password
  if (user.password !== password) {
    return res.status(401).json({
      message: "Incorrect password."
    });
  }

  res.json({
    message: "Login successful! Redirecting...",
    user
  });

});


/* START SERVER */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});