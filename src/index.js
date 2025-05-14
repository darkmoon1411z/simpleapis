// Pkg (Top)
import chalk from "chalk";
import Fastify from "fastify";

// Pkg (Utils)
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";

// Custom
import router from "./routes/router.js";

// Intial web server
const fastify = Fastify({
  logger: true,
});

// Security for fastify
fastify.register(cors);
fastify.register(formbody);

// First route (Test)
fastify.get("/test", (request, reply) => {
  reply.send("Hello world!");
});

// Register driver for routes
fastify.register(router);

// Running server
export async function WebServer() {
  try {
    fastify.listen({ port: 6900 }, (err, address) => {
      if (err) {
        console.error(chalk.red("[Server : Error]"), "Unexpected in:\n", err);
      }
    });
  } catch (error) {
    console.error(chalk.red("[Web : Error]"), "Unexpected in:\n", error);
  }
}
