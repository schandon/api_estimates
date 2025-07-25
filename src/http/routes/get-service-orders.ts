import { PrismaClient } from '@prisma/client';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';

const prisma = new PrismaClient();

export const getServiceOrder: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/api/v1/os',
    {
      schema: {
        tags: ['Ordem de Serviço'],
      },
    },
    async (_request, reply) => {
      try {
        const result = await prisma.service_orders.findMany();
        return result;
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: Erro em Tela
        console.log('Error na Rota:', error);
        return reply.status(400).send({ message: 'Error: OS not found' });
      }
    }
  );
  app.get(
    '/api/v1/os/:OrdemServico',
    {
      schema: {
        tags: ['Ordem de Serviço'],
        params: z.object({
          OrdemServico: z.string().nonempty('OS não pode ser Vazio'),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { OrdemServico } = request.params;
        const result = await prisma.service_orders.findUnique({
          where: { OrdemServico },
        });
        return result;
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: Erro em Tela
        console.log('Error na Rota:', error);
        return reply
          .status(400)
          .send({ message: 'Error IMO: Vessel not found' });
      }
    }
  );
};
