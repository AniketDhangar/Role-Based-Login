import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
    email: {
      type: String,
      required: [true, "Enter your email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
    },
    role: {
      type: String,
      enum: ["admin", "user", "engineer"],
      required: [true, "please choose your role."],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
