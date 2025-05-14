// Pkg
import { Types } from "mongoose";
import chalk from "chalk";
import Service from "../../../database/models/services.js";

/**
 * **Get**
 *
 * Get or map all services stored in the database
 * @param {import("fastify").FastifyRequest} request - Petition to server
 * @param {import("fastify").FastifyReply} reply - Response to client
 * @returns {Promise<void>} Response JSON
 */
export default async function Get(request, reply) {
  try {
    // Verify params
    const { id } = request.params;
    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        return reply.code(400).send({
          statusCode: 400,
          msg: "The provided id is not valid",
        });
      }

      const data = await Service.findById(id).select("-__v");
      if (!data) {
        return reply.code(404).send({
          statusCode: 404,
          msg: "That service was not found or does not exist",
        });
      }

      // Response
      return reply.code(200).send(data);
    } else {
      const data = await Service.find().select("-__v");
      if (data.length < 1) {
        return reply.code(404).send({
          statusCode: 404,
          msg: "No services stored in the database have been found",
        });
      }

      // Response
      return reply.code(200).send(data);
    }
  } catch (error) {
    request.log.error(chalk.red("[Services : getError]"), error);
    return reply.code(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
      cmd: error.message,
    });
  }
}
