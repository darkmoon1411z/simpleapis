// Pkg
import chalk from "chalk";
import { Types } from "mongoose";
import Product from "../../../database/models/products.js";

/**
 * **Get**
 *
 * Get or map all products stored in the database
 * @param {import("fastify").FastifyRequest} request - Petition to server
 * @param {import("fastify").FastifyReply} reply - Response to client
 * @returns {Promise<void>} Response JSON
 */
export default async function Get(request, reply) {
  try {
    const { id } = request.params;
    if (id) {
      if (!Types.ObjectId.isValid(id)) {
        return reply.code(400).send({
          statusCode: 400,
          msg: "The provided id is not valid",
        });
      }

      const data = await Product.findById(id).select("-__v");
      if (!data) {
        return reply.code(404).send({
          statusCode: 404,
          msg: "That product was not found or does not exist",
        });
      }

      // Response
      return reply.code(200).send(data);
    } else {
      const products = await Product.find().select("-__v");
      if (products.length < 1) {
        return reply.code(404).send({
          statusCode: 404,
          msg: "No products stored in the database have been found",
        });
      }

      // Response
      return reply.code(200).send(products);
    }
  } catch (error) {
    request.log.error(chalk.red("[Server : getError]"), error);
    return reply.code(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
      cmd: error.message,
    });
  }
}
