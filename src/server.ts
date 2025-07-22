import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { getCoin } from "./http/routes/get-all-coin.ts";
import { getVessel } from "./http/routes/get-all-vessels.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "http://localhost:9998",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
	return "OK ^_^";
});

app.register(getVessel);
app.register(getCoin);

const start = async () => {
	try {
		await app.listen({ port: env.API_PORT });
		console.log(`API Estimate on ${env.API_PORT} 🚀`);
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};

start();
