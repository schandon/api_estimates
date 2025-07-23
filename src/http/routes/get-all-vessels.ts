import { PrismaClient } from '@prisma/client';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';

const prisma = new PrismaClient();

export const getVessel: FastifyPluginCallbackZod = (app) => {
  app.get('/api/v1/vessel', async (_request, reply) => {
    try {
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
    } catch {
      return reply
        .status(400)
        .send({ message: 'Error GET: Vessels not found' });
    }
  });

  app.get(
    '/api/v1/vessel/imo/:imo',
    {
      schema: {
        params: z.object({
          imo: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { imo } = request.params;
        const result = await prisma.vessel.findFirst({
          where: { imo },
        });
        return result;
      } catch {
        return reply
          .status(400)
          .send({ message: 'Error IMO: Vessel not found' });
      }
    }
  );

  app.get(
    '/api/v1/vessel/mmsi/:mmsi',
    {
      schema: {
        params: z.object({
          mmsi: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { mmsi } = request.params as { mmsi: string };
        const result = await prisma.vessel.findFirst({
          where: { mmsi },
        });
        return result;
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: Erro em Tela
        console.log('Error na Rota:', error);
        return reply
          .status(400)
          .send({ message: 'Error MMSI: Vessel not found' });
      }
    }
  );
  app.get(
    '/api/v1/vessel/:embarcacao',
    {
      schema: {
        params: z.object({
          embarcacao: z
            .string()
            .nonempty('ID não pode ser Vazio')
            // biome-ignore lint/performance/useTopLevelRegex: Regex de Ajuste do código
            .regex(/^\d+$/, 'MMSI deve conter apenas dígitos')
            .transform((val) => Number.parseInt(val, 10))
            // biome-ignore lint/suspicious/noGlobalIsNan: Função de validação valor NaN
            .refine((val) => !isNaN(val), 'ID deve ser um número valido'),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { embarcacao } = request.params;
        const result = await prisma.vessel.findUnique({
          where: { embarcacao },
        });
        return result;
      } catch {
        return reply.status(400).send({ message: 'Error: Vessel not found' });
      }
    }
  );
};
