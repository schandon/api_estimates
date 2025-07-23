# API Test
API Rest sendo desenvolvida com Fastify, estamos utilizando o ORM do prisma para um futuro banco de dados em SQL Server.

As rotas estão descritas no arquivo do `client.http`


## Modo de Desenvolvedor
No arquivo da Rota, que está no caminho `./src/http/routes/**.ts`.  Ao utilizar em debugger pode ser interessante utilizar o prisma configurado como a seguir `const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });` 