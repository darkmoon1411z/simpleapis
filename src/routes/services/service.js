// Core or petitions
import get from "./core/get.js";
import post from "./core/post.js";
import put from "./core/put.js";
import del from "./core/del.js";

/**
 * **Services**
 * 
 * Service Manager, creates, modifies or deletes API services
 * @param {import('fastify').FastifyInstance} fastify - Instance of Fastify
 * @returns {Promise<void>} Resolves when routes are registered
 */
export default async function Service(fastify) {
  // Get - Find service
  fastify.get("/:id", get);

  // Put - Update service
  fastify.put("/:id", put);

  // Post - Create service
  fastify.post("/", post);

  // Delete - Remove service
  fastify.delete("/:id", del);
}
