import mongoose, { Schema } from "mongoose";
import { Note } from "../types/types";

const noteSchema = new Schema<Note>({
  videoId: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  note: {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: false,
      default: ''
    }
  }
}, { timestamps: true });

export default mongoose.model<Note>("Note", noteSchema);