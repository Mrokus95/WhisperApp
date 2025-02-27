import generateToken from "../utils/generateToken.js";
import User from "./../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    //Get input data
    const { fullName, username, password, confirmPassword, gender } = req.body;

    //Check password
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match." });
    }

    //Check if user exists
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists." });
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Get basic profilePic from API
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //Create user
    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender == "Male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ""
      );
      if (isPasswordCorrect) {
        generateToken(user._id, res);
        res.status(200).json({
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic,
        });
      } else {
        res.status(404).json({
          message: "User with that username or password doesn't exists.",
        });
      }
    } else {
      res.status(404).json({
        message: "User with that username or password doesn't exists.",
      });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  {
    try {
      res
        .clearCookie("jwt")
        .status(200)
        .json({ message: "Logout sucessfully." });
    } catch (error) {
      console.error("Error during logout:", error.message);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
};
