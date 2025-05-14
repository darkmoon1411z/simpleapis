// Pkg
import chalk from "chalk";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

// Events for this connection
mongoose.connection.once("open", () => {
  console.info(chalk.green("[Mongo : Open]"), "Connected to the database");
});
mongoose.connection.on("reconnected", () => {
  console.warn(
    chalk.yellow("[Mongo : Reconnected]"),
    "Reconnecting to the database"
  );
});
mongoose.connection.on("close", () => {
  console.info(
    chalk.gray("[Mongo : Close]"),
    "Connection to the database closed"
  );
});

export async function MongoConnection() {
  try {
    // Encode password
    const pwd = encodeURIComponent(process.env.MONGO_PWD);
    const URI = String(process.env.MONGO_URI).replace("{pwd}", pwd);

    // Start connection
    await mongoose.connect(URI);
  } catch (error) {
    console.error(chalk.red("[Mongo : Error]"), "Unexpected in:\n", error);
    return process.exit(1);
  }
}
