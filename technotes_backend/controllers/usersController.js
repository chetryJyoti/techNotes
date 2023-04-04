const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//get method
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No user found" });
  }
  res.json(users);
});

//post method
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  //confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check for duplicate user
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashPassword, roles };

  //create and store the user
  const user = await User.create(userObject);

  if (user) {
    return res.status(201).json({ message: `new user ${username} created` });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

//update user
//patch method
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  //check for duplicate
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  //Allow updated to original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate username" });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    //hash pass
    user.password = await bcrypt.hash(password, 10); //salt rounds
  }
  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
});

//delete method
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res
      .status(400)
      .json({ message: "User has assigned notes !!! User can't be deleted" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const result = await user.deleteOne();
  const reply = `Username ${result.username} with ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
