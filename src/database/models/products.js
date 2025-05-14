// Pkg
import { model, Schema } from "mongoose";

// Parent
const product = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: Array, default: [] },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
});

// Export model
export default model("products", product);
