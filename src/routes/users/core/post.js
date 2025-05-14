// Models
import User from "../../../database/models/users.js";

/**
 * **Post**
 *
 * Creating and Storing Users
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
    const fields = ["name", "email", "password", "age"];
    const missingFields = fields.filter((key) => !bodyKeys.includes(key));
    if (missingFields.length > 0) {
      return reply.code(400).send({
        statusCode: 400,
        msg: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Ordinal keys
    const { name, email, password, age } = request.body;

    // New user entry
    const user = new User({
      name: name,
      email: email,
      password: password,
      age: age,
    });
    await user.save();

    // Response
    return reply.code(200).send({
      statusCode: 200,
      msg: "The user has been successfully stored",
      date: new Date(),
    });
  } catch (error) {
    // Back response
    console.log(error);

    // Front response
    reply.code(500);
    return {
      statusCode: 500,
      msg: "Internal server error",
      errorContent: error,
    };
  }
}
