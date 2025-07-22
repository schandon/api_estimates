import { PrismaClient } from "@prisma/client";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

// import { z } from "zod/v4";

const prisma = new PrismaClient();

export const getCoin: FastifyPluginCallbackZod = (app) => {
	app.get("/api/v1/coin", async (request, reply) => {
		// try {
		const result = await prisma.coin.findMany({
			select: {
				moeda: true,
				descricao: true,
			},
		});
		return result;
		// } catch (error) {
		// 	return reply.status(400).send({ message: "Error to get Vessels" });
		// }
	});
};
