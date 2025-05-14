// Pkg
import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Parent
const usrs = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  createdAt: {
    date: { type: Date, default: new Date() },
    timestamp: { type: Number, default: Math.floor(Date.now() / 1000) },
  },
});

// Middleware (Auto)
usrs.pre("save", function (next) {
  try {
    if (this.isModified("password") && this.password) {
      // Hash password
      this.password = bcrypt.hashSync(this.password, 10);
    }

    // Passed
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware (Updated)
usrs.pre("findOneAndUpdate", function (next) {
  try {
    const update = this.getUpdate();
    if (update.$set && update.$set.password) {
      update.$set.password = bcrypt.hashSync(update.$set.password, 10);
    }

    // Passed
    next();
  } catch (error) {
    next(error);
  }
});

// Export model
export default model("users", usrs);
