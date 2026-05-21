import mongoose, { Document } from "mongoose";


export type Disc = Document & {
  name: string;
  user?: mongoose.Types.ObjectId | string;
  videos: string[];
  parentId: mongoose.Types.ObjectId | string | null;
  ancestors: (mongoose.Types.ObjectId | string)[];
}

export type User = Document & {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  profilePicture: string;
  bio: string;
  gender: 'male' | 'female';
  birthday: Date;
}

export type DecodedToken = {
  id: string;
  username: string;
}

export type Note = Document & {
  videoId: string;
  user: mongoose.Types.ObjectId | string;
  note: {
    title: string;
    description?: string;
  }
}