// Pkg
import chalk from "chalk";
import { Types } from "mongoose";
import Service from "../../../database/models/services.js";

/**
 * **Put**
 *
 * Modification and renewal of services
 * @param {import("fastify").FastifyRequest} request - Petition to server
 * @param {import("fastify").FastifyReply} reply - Response to client
 * @returns {Promise<void>} Response JSON
 */
export default async function Put(request, reply) {
  try {
    const { id } = request.params;
    if (!id || !Types.ObjectId.isValid(id)) {
      return reply.code(400).send({
        statusCode: 400,
        msg: "The provided id is not valid",
      });
    }

    // Verify if body exists
    if (!request.body || typeof request.body !== "object") {
      return reply.code(400).send({
        statusCode: 400,
        msg: "Invalid or missing request body.",
      });
    }

    // Valid fields
    const fields = ["name", "description", "price", "active"];

    // Not null and convert
    let serviced = {};
    for (const [key, value] of Object.entries(request.body)) {
      if (fields.includes(key) && value !== null) {
        if (key === "price") {
          serviced[key] = Number(value);
        } else if (key === "active") {
          serviced[key] = Boolean(value);
        } else {
          serviced[key] = value;
        }
      }
    }

    // Verify data
    if (Object.keys(serviced).length < 1) {
      return reply.code(400).send({
        statusCode: 400,
        msg: "The service could not be updated due to invalid fields provided.",
      });
    }

    // Updated on db
    await Service.findByIdAndUpdate(
      id,
      { $set: { ...serviced } },
      { new: true, runValidators: true, context: "query" }
    );

    // Response
    reply.code(200).send({
      statusCode: 200,
      msg: "Service updated",
      data: serviced
    });
  } catch (error) {
    request.log.error(chalk.red("[Server : putError]"), error);
    return reply.code(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
      cmd: error.message,
    });
  }
}
