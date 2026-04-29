import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6
  }
}, { timestamps: true});

export default mongoose.model<User>('User', userSchema);