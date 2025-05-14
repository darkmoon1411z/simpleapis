// Pkg
import chalk from "chalk";
import Service from "../../../database/models/services.js";

/**
 * **Post**
 *
 * Creating and Storing Services
 * @param {import("fastify").FastifyRequest} request - Petition to server
 * @param {import("fastify").FastifyReply} reply - Response to client
 * @returns {Promise<void>} Response JSON
 */
export default async function Post(request, reply) {
  try {
    // Get body
    if (!request.body || typeof request.body !== "object") {
      return reply.code(400).send({
        statusCode: 400,
        msg: "Invalid or missing request body.",
      });
    }

    // Verify body
    const bodyKeys = Object.keys(request.body);
    if (bodyKeys.length < 1) {
      return reply.code(400).send({
        statusCode: 400,
        msg: "Request body is empty.",
      });
    }

    // Required fields
    const fields = ["name", "description"];
    const missingFields = fields.filter((key) => !bodyKeys.includes(key));
    if (missingFields.length > 0) {
      return reply.code(400).send({
        statusCode: 400,
        msg: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Ordinal keys
    const { name, description } = request.body;

    // New entry service
    const service = new Service({
      name: name,
      description: description,
    });
    await service.save();

    // Response
    return reply.code(200).send({
      statusCode: 200,
      msg: "The service has been stored",
      date: new Date(),
    });
  } catch (error) {
    request.log.error(chalk.red("[Server : postError]"), error);
    return reply.code(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
      cmd: error.message,
    });
  }
}
