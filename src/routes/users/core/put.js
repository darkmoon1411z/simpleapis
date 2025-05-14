// Models
import User from "../../../database/models/users.js";
import { Types } from "mongoose";

/**
 * **Put**
 *
 * Modification and renewal of user data
 * @param {import("fastify").FastifyRequest} request - Petition to server
 * @param {import("fastify").FastifyReply} reply - Response to client
 * @returns {Promise<void>} Response JSON
 */
export default async function Put(request, reply) {
  try {
    // Get params
    const { id } = request.params;
    if (!id || !Types.ObjectId.isValid(id)) {
      return reply.code(400).send({
        statusCode: 400,
        msg: "Invalid or missing request id",
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
    const fields = ["name", "email", "password", "age"];

    // Not null
    let updatedUsr = {};
    for (const [key, value] of Object.entries(request.body)) {
      if (fields.includes(key) && value !== null) {
        updatedUsr[key] = value;
      }
    }

    // Verify data
    if (Object.keys(updatedUsr).length < 1) {
      return reply.code(400).send({
        statusCode: 400,
        msg: "The user could not be updated due to invalid fields provided.",
      });
    }

    // Save new data for user
    await User.findByIdAndUpdate(
      id,
      { $set: { ...updatedUsr } },
      { new: true, runValidators: true, context: "query" }
    );

    return reply.code(200).send({
      statusCode: 200,
      msg: "User updated",
      data: updatedUsr,
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
