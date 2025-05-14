// Pkg
import chalk from "chalk";
import { Types } from "mongoose";
import Product from "../../../database/models/products.js";

/**
 * **Put**
 *
 * Modification and renewal of products
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
    const fields = ["name", "description", "features", "price", "stock"];

    // Not null and convert
    let producted = {};
    for (const [key, value] of Object.entries(request.body)) {
      if (fields.includes(key) && value !== null) {
        if (key === "price") {
          producted[key] = Number(value);
        } else if (key === "stock") {
          producted[key] = Number(value);
        } else if (key === "features") {
          producted[key] = value.split(",");
        } else {
          producted[key] = value;
        }
      }
    }

    // Verify data
    if (Object.keys(producted).length < 1) {
      return reply.code(400).send({
        statusCode: 400,
        msg: "The product could not be updated due to invalid fields provided.",
      });
    }

    // Updated on db
    await Product.findByIdAndUpdate(
      id,
      { $set: { ...producted } },
      { new: true, runValidators: true, context: "query" }
    );

    // Response
    return reply.code(200).send({
      statusCode: 200,
      msg: "Product updated",
      data: producted,
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
