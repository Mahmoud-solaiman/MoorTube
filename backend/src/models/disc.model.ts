import mongoose, { Schema } from "mongoose";
import { Disc } from "../types/types";

const discSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  videos: {
    type: Array,
    required: false,
    default: [],
  },
  subDiscs: {
    type: Array,
    required: false,
    default: [],
  }
}, { timestamps: true});

export default mongoose.model<Disc>('Disc', discSchema);