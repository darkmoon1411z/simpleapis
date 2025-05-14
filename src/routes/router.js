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

  // Home
  fastify.get("/", async (request, reply) => {
    const html = `
      <html>
        <head>
          <meta http-equiv="refresh" content="3;url=https://github.com/darkmoon1411z/simpleapis" />
        </head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 20%;">
          <h2>Redirigiendo a la nueva ruta...</h2>
          <p>Seras redirigido en unos segundos. Si no lo eres, haz clic <a href="https://github.com/darkmoon1411z/simpleapis">aqui</a>.</p>
        </body>
      </html>
    `;
    reply.code(200).header("Content-Type", "text/html").send(html);
  });
}

export default router;
