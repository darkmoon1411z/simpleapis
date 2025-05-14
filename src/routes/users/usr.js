// Core or petitions
import get from "./core/get.js";
import post from "./core/post.js";
import put from "./core/put.js";
import del from "./core/del.js";

/**
 * **Users**
 *
 * User management: Create, modify, or delete users from this API access.
 * @param {import('fastify').FastifyInstance} fastify - Instance of Fastify
 * @returns {Promise<void>} Resolves when routes are registered
 */
export default async function Usr(fastify) {
  // Get - Find user
  fastify.get("/:id", get);

  // Put - Update user
  fastify.put("/:id", put);

  // Post - Create user
  fastify.post("/", post);

  // Delete - Remove user
  fastify.delete("/:id", del);
}
