import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

export const getHealth: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
      },
    },
    (_request, reply) => {
      return reply.status(200).send({ message: 'OK ^_^' });
    }
  );
};
