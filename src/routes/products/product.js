// Core or petitions
import get from "./core/get.js";
import post from "./core/post.js";
import put from "./core/put.js";
import del from "./core/del.js";

/**
 * **Products**
 *
 * Product management: create, modify, and delete data stored in the database
 * @param {import('fastify').FastifyInstance} fastify - Instance of Fastify
 * @returns {Promise<void>} Resolves when routes are registered
 */
export default async function Product(fastify) {
  // Get - Find product
  fastify.get("/:id", get);

  // Put - Update product
  fastify.put("/:id", put);

  // Post - Create product
  fastify.post("/", post);

  // Delete - Remove product
  fastify.delete("/:id", del);
}
