import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: `All Fields Are Required`,
    });
  }

  const checkMail = await User.findOne({ email });
  if (checkMail) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();
  res.status(201).json({
    message: "User registered successfully",
  });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password both are required",
    });
  }

  const data = await User.findOne({ email });
  if (!data) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const comparedPassword = await bcrypt.compare(password, data.password);

  if (!comparedPassword) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  } else {
    const token = jwt.sign(
      {
        userId: data._id,
        email: data.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Successfully loggedIn",
      token,
      user: {
        name: data.name,
        email: data.email,
      },
    });
  }
};
