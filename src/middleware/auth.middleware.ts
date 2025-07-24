/** biome-ignore-all lint/suspicious/useAwait: testes */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { env } from '../env.ts';

interface User {
  userId: string;
  email: string;
}

interface AuthenticatedRequest extends FastifyRequest {
  user?: User;
}

export async function authenticateToken(
  request: AuthenticatedRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return reply
      .status(401)
      .send({ success: false, message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET!) as User;
    request.user = decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return reply
      .status(403)
      .send({ success: false, message: 'Invalid or expired token' });
  }
}

// Para usar como hook global ou por rota:
export function addAuthHook(fastify: FastifyInstance) {
  fastify.addHook(
    'preHandler',
    async (request: AuthenticatedRequest, reply: FastifyReply) => {
      // Aqui você pode chamar a função de autenticação ou fazer a lógica inline
      // ou modificar para aceitar rotas específicas
      await authenticateToken(request, reply);
    }
  );
}
