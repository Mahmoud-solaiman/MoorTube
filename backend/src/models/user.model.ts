import mongoose, { Schema } from 'mongoose';
import { User } from '../types/types';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6
  }
}, { timestamps: true});

export default mongoose.model<User>('User', userSchema);