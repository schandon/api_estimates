import { z } from "zod";

const envSchema = z.object({
	API_PORT: z.coerce.number().default(4444),
	DATABASE_URL: z.string().url().startsWith("sqlserver://"),
	HOST_API: z.string().nonempty(),
	NODE_ENV: z.string().default("development"),
});

export const env = envSchema.parse(process.env);
