import chalk from "chalk";
import { Types } from "mongoose";
import Product from "../../../database/models/products.js";

/**
 * **Delete**
 *
 * Removal of products
 * @param {import("fastify").FastifyRequest} request - Petition to server
 * @param {import("fastify").FastifyReply} reply - Response to client
 * @returns {Promise<void>} Response JSON
 */
export default async function Delete(request, reply) {
  try {
    const { id } = request.params;
    if (!id && !Types.ObjectId.isValid(id)) {
      return reply.code(400).send({
        statusCode: 400,
        msg: "The provided id is not valid",
      });
    }

    // Delete product
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return reply.code(404).send({
        statusCode: 404,
        msg: "Product not found",
      });
    }

    // Response
    return reply.code(200).send({
      statusCode: 200,
      msg: "Product removed",
    });
  } catch (error) {
    request.log.error(chalk.red("[Server : deleteError]"), error);
    return reply.code(500).send({
      statusCode: 500,
      msg: "Internal Server Error",
      cmd: error.message,
    });
  }
}
