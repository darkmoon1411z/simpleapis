// Pkg
import { Types } from "mongoose";

// Models
import User from "../../../database/models/users.js";

/**
 * **Delete**
 *
 * Delete existing users from the database
 * @param {import("fastify").FastifyRequest} request - Petition to server
 * @param {import("fastify").FastifyReply} reply - Response to client
 * @returns {Promise<void>} Response JSON
 */
export default async function Delete(request, reply) {
  try {
    // Get params
    const { id } = request.params;
    if (!id) {
      return reply.code(400).send({
        statusCode: "400",
        msg: "Please provide the user ID you want to delete.",
      });
    }
    if (!Types.ObjectId.isValid(id)) {
      return reply.code(400).send({
        statusCode: 400,
        msg: "The user id is not valid",
      });
    }

    // Delete user
    const del = await User.findByIdAndDelete(id);
    if (!del) {
      return reply.code(404).send({
        statusCode: 404,
        msg: "User not found",
      });
    }

    // Response
    return reply.code(200).send({
      statusCode: 200,
      msg: "User id has been deleted.",
    });
  } catch (error) {
    // Back response
    console.log(error);

    // Front response
    reply.code(500);
    return {
      statusCode: 500,
      msg: "Internal server error",
    };
  }
}
