import { Request } from "express";
import mongoose, { Document } from "mongoose";


export type Disc = {
  name: string;
  user?: mongoose.Types.ObjectId;
  videos: string[];
  subDiscs: Disc[];
}

export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export type DecodedToken = {
  id: string;
  username: string;
}