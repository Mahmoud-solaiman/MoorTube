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
    type: [String],
    required: false,
    default: [],
  },
  parentId: {
    type: mongoose.Types.ObjectId,
    required: false,
    default: null,
    index: true
  },
  ancestors: {
    type: [mongoose.Types.ObjectId],
    required: true,
    default: [],
    index: true
  }
}, { timestamps: true});

export default mongoose.model<Disc>('Disc', discSchema);