const mongoose = require("mongoose");
const config = require("../../common/.env.config");
mongoose.connect(
  config.dbConnect,
  { useNewUrlParser: true }
);
const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  level: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);

exports.createUser = userData => {
  const user = new User(userData);
  return user.save();
};

exports.getById = id => {
  const user = User.findById(id)
    .select("-__v")
    .select("-_id")
    .select("-password")
    .select("-level");
  return user;
};

exports.getUserByEmail = email => {
  return User.findOne({ email: email });
};

exports.patchUser = (id, userData) => {
  return User.findByIdAndUpdate(id, userData, { new: true });
};

exports.removeById = id => {
  return User.findByIdAndDelete(id);
};
