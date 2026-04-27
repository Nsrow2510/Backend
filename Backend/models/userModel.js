// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   mobile: String,
//   password: String
// }, { timestamps: true });

// // 🔐 HASH PASSWORD (MODEL ME)
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;

//   this.password = await bcrypt.hash(this.password, 10);
// });

// // 🔍 COMPARE PASSWORD
// userSchema.methods.comparePassword = function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };
// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String
}, { timestamps: true });

/* 🔐 HASH PASSWORD */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/* 🔍 COMPARE PASSWORD */
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);