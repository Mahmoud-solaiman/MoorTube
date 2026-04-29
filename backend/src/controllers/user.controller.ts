import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Both fields are required' });

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(200).json({ message: "User already exists. Try logging in instead." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User has been registered successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(400).json({ message: 'Both email and password are required for login' });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Oops! Seems like user doesn't exist. Try registering for a new account" });

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return res.status(400).json({ message: "Incorrect password. Please, try again!" });


    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1d'}
    );

    res.status(200).json({
      message: 'User logged in successfully!',
      email,
      token
    });

  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}