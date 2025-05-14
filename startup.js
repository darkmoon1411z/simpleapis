/*!shell*/
import { MongoConnection } from "./src/database/db.js";
import { WebServer } from "./src/index.js";

async function StartUp() {
  // Run db
  await MongoConnection();

  // Run web server
  await WebServer();
}

// Run startup
StartUp().catch((err) => {
  console.error("[startUp : Error] Faltal in:\n", err);
  process.exit(1);
});
