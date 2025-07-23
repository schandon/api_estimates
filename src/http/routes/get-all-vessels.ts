import { PrismaClient } from '@prisma/client';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

// import { z } from "zod/v4";

const prisma = new PrismaClient();

export const getVessel: FastifyPluginCallbackZod = (app) => {
  app.get('/api/v1/vessel', async (request, reply) => {
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
    } catch (error) {
      return reply
        .status(400)
        .send({ message: 'Error GET: Vessels not found' });
    }
  });

  app.get('/api/v1/vessel/imo/:imo', async (request, reply) => {
    try {
      const { imo } = request.params as { imo: string };
      const result = await prisma.vessel.findFirst({
        where: { imo },
      });
      return result;
    } catch (error) {
      return reply.status(400).send({ message: 'Error IMO: Vessel not found' });
    }
  });

  app.get('/api/v1/vessel/mmsi/:mmsi', async (request, reply) => {
    try {
      const { mmsi } = request.params as { mmsi: string };
      const result = await prisma.vessel.findFirst({
        where: { mmsi },
      });
      return result;
    } catch (error) {
      return reply
        .status(400)
        .send({ message: 'Error MMSI: Vessel not found' });
    }
  });
};
