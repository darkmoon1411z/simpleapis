// Pkg
import { Types } from "mongoose";

// Models
import User from "../../../database/models/users.js";

/**
 * **Get**
 *
 * Get or map all users stored in the database
 * @param {import("fastify").FastifyRequest} request - Petition to server
 * @param {import("fastify").FastifyReply} reply - Response to client
 * @returns {Promise<void>} Response JSON
 */
export default async function Get(request, reply) {
  try {
    // Get params
    const { id } = request.params;
    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        return reply.code(400).send({
          statusCode: 400,
          msg: "The provided id is not valid",
        });
      }

      const user = await User.findById(id).select("-password -__v");
      if (!user) {
        return reply.code(404).send({
          statusCode: 404,
          msg: "User not found",
        });
      }

      // Response
      return reply.code(200).send(user);
    } else {
      const users = await User.find().select("-password -__v");
      if (users.length < 1) {
        reply.code(404).send({
          statusCode: 404,
          msg: "No users stored in the database have been found",
        });
      }

      // Response
      return reply.code(200).send(users);
    }
  } catch (error) {
    // Back response
    console.log(error);

    // Front response
    reply.code(500);
    return {
      statusCode: 500,
      msg: "Internal server error",
      error: error,
    };
  }
}
