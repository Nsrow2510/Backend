const Contact = require("../models/contactModel");

exports.sendMessage = async (req, res) => {
  const msg = await Contact.create(req.body);
  res.json({ message: "Message sent", msg });
};