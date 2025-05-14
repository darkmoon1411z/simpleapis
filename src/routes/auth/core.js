// Pkg
import chalk from "chalk";
import { compareSync } from "bcryptjs";
import User from "../../database/models/users.js";

/**
 * **Auth**
 *
 * Access management using sessions based on fastify cookies and key values
 * @param {import('fastify').FastifyInstance} fastify - Instance of Fastify
 * @returns {Promise<void>} Resolves when routes are registered
 */
export default async function Auth(fastify) {
  fastify.post("/oid", async (request, reply) => {
    try {
      // Verify body
      if (!request.body) {
        return reply.code(400).send({
          statusCode: 400,
          msg: "Invalid or missing request body",
        });
      }

      // Verify fields
      const { email, password } = request.body;
      if (!email || !password) {
        return reply.code(400).send({
          statusCode: 400,
          msg: "The email and password fields are required.",
        });
      }

      // Catch usr
      const user = await User.findOne({ email: email });
      if (!user) {
        return reply.code(404).send({
          statusCode: 404,
          msg: "User not found",
        });
      }

      // Verify password
      const isValid = compareSync(password, user.password);
      if (!isValid) {
        return reply.code(401).send({
          statusCode: 401,
          msg: "The password is incorrect",
        });
      }

      // Response
      return reply.code(200).send({
        statusCode: 200,
        msg: "OK!",
        user: {
          name: user.name,
          email: user.email,
          age: user.age,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      request.log.error(chalk.red("[Auth : postError]"), error);
      return reply.code(500).send({
        statusCode: 500,
        msg: "Internal Server Error",
        cmd: error.message,
      });
    }
  });
}
