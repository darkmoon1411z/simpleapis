// Pkg
import { model, Schema } from "mongoose";

// Parent
const service = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
  createdAt: {
    date: { type: Date, default: new Date() },
    timestamp: { type: Number, default: Math.floor(Date.now() / 1000) },
  },
});

// Export model
export default model("services", service);
