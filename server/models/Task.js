import mongoose from "mongoose";

const taskScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  background: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Task", taskScheme);
