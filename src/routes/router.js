/**
 * **Router**
 *
 * Server-side route controller
 * @param {import('fastify').FastifyInstance} fastify - Instance of Fastify
 * @param {Object} options - Router Options (Optional)
 * @returns {Promise<void>} Resolves when routes are registered
 */
async function router(fastify, options) {
  // Auth
  await fastify.register(import("./auth/core.js"), { prefix: "/auth" });

  // Producs
  await fastify.register(import("./products/product.js"), {
    prefix: "/products",
  });

  // Services
  await fastify.register(import("./services/service.js"), {
    prefix: "/services",
  });

  // Users
  await fastify.register(import("./users/usr.js"), { prefix: "/users" });
}

export default router;
