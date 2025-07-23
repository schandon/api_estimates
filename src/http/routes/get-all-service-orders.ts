import { PrismaClient } from '@prisma/client';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

// import { z } from "zod/v4";

const prisma = new PrismaClient();

export const getServiceOrder: FastifyPluginCallbackZod = (app) => {
  app.get('/api/v1/os', async (request, reply) => {
    try {
      const result = await prisma.service_orders.findMany();
      return result;
    } catch (error) {
      return reply.status(400).send({ message: 'Error: OS not found' });
    }
  });
  app.get('/api/v1/os/:OrdemServico', async (request, reply) => {
    try {
      const { OrdemServico } = request.params as { OrdemServico: string };
      const result = await prisma.service_orders.findUnique({
        where: { OrdemServico },
      });
      return result;
    } catch (error) {
      return reply.status(400).send({ message: 'Error IMO: Vessel not found' });
    }
  });
};
