
// // const express = require("express");
// // const router = express.Router();

// // const { registerUser, loginUser, getUserById } = require("../controllers/userController");

// // router.post("/register", registerUser);
// // router.post("/login", loginUser);
// // // router.get("/users/:id", getUserById);
// // // router.post("/register", registerUser);
// // // router.post("/login", loginUser);
// // router.get("/me", auth, getUserById);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const auth = require("../middlewares/auth"); // ⭐ ADD THIS

// const {
//   registerUser,
//   loginUser,
//   getCurrentUser
// } = require("../controllers/userController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // session based route
// // router.get("/me", auth, getUserById);
// const { getCurrentUser } = require("../controllers/userController");

// router.get("/me", auth, getCurrentUser);

// module.exports = router;

const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  registerUser,
  loginUser,
  getCurrentUser
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", auth, getCurrentUser);

module.exports = router;

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

router.get("/me", (req, res) => {

  // CHECK SESSION
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  // USER EXISTS
  res.status(200).json(req.session.user);
});