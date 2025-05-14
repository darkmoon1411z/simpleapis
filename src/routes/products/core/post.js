// Pkg
import chalk from "chalk";
import Product from "../../../database/models/products.js";

/**
 * **Post**
 *
 * Creating and Storing Products
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
    const nFields = ["name", "description", "features", "price", "stock"];
    const missingFields = fields.filter((key) => !bodyKeys.includes(key));
    if (missingFields.length > 0) {
      return reply.code(400).send({
        statusCode: 400,
        msg: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Ordinal keys
    let producted = {};
    for (const [key, value] of Object.entries(request.body)) {
      if (nFields.includes(key) && value !== null) {
        if (key === "price" || key === "stock") {
          producted[key] = Number(value);
        } else if (key === "features") {
          producted[key] = value.split(",");
        } else {
          producted[key] = value;
        }
      }
    }

    // New entry product
    const product = new Product({ ...producted });
    await product.save();

    // Response
    return reply.code(200).send({
      statusCode: 200,
      msg: "The product has been stored",
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
