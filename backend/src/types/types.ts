import mongoose, { Document } from "mongoose";


export type Disc = {
  id: string;
  name: string;
  user?: mongoose.Types.ObjectId;
  videos: string[];
  subDiscs: Disc[];
  createdAt: Date;
  updatedAt: Date;
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