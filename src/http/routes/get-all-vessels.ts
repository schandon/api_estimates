import { PrismaClient } from "@prisma/client";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

// import { z } from "zod/v4";

const prisma = new PrismaClient();

export const getVessel: FastifyPluginCallbackZod = (app) => {
	app.get("/api/v1/vessel", async (request, reply) => {
		// try {
		const result = await prisma.vessel.findMany({
			select: {
				embarcacao: true,
				nome: true,
				imo: true,
				mmsi: true,
				callsign: true,
				bloqueado: true,
			},
		});
		return result;
		// } catch (error) {
		// 	return reply.status(400).send({ message: "Error to get Vessels" });
		// }
	});
};
