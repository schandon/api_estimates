import { fastifyCors } from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { getHealth } from './http/routes/get-health.ts';
import { getServiceOrder } from './http/routes/get-service-orders.ts';
import { getVessel } from './http/routes/get-vessels.ts';
import { authenticateToken } from './middleware/auth.middleware.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:9998',
});

if (env.NODE_ENV === 'production') {
  app.addHook('preHandler', authenticateToken);
}

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'JRC BRASIL - API Estimates',
      description:
        'Documentação da API, feita pelos desenvolvedores da JRC Brasil, para alimentação de softwares internos da empresa.',
      version: '1.0.0',
    },
    openapi: '3.1.0',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(getHealth);
app.register(getVessel);
app.register(getServiceOrder);

const start = async () => {
  try {
    await app.listen({ port: env.API_PORT });
    // biome-ignore lint/suspicious/noConsole: Aviso de Código Ok on Console
    console.log(`API Estimate on ${env.API_PORT} 🚀`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
