const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: "string", required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  friends: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
