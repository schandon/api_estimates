# API Estimates
API Estimate é uma API que estará sendo utilizada no projeto de DSR, para a validação de algumas informações como Navio, OS, que são registradas antes da geração do Relatório.

Api está sendo desenvolvida com o **Fastify** para o Node.js, ele fornece uma estrutura organizada e otimizada para a necessidade do trabalho, junto a isso estamos utilizando o **Prisma** como o ORM que faz a abstração do banco de dados da Aplicação, atualmente estamos utilizando um banco de dados do **SQL Server**.

## Modo desenvolvimento

#### Rodando a Aplicação
Para instalação das bibliotecas que precisam:
````bash
npm i
````

Para rodar a aplicação estaremos executando o comando:
````bash
npm run dev
````

#### Modo de Debuger
No arquivo da Rota, que está no caminho `./src/http/routes/**.ts`.  Ao utilizar em debugger pode ser interessante utilizar o prisma configurado como a seguir `const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });` 



#### Rotas Cadastradas:
As rotas da aplicação estão descritas na pasta de `clients`, separados por cada rota de ação, sendo elas:
  - `vessel.http` 
  - `service_order.http`
  <br>
- **Vessel**
  - `/api/v1/vessel/:id` - Busca informações de um navio apartir do **ID**
  - `/api/v1/vessel/mmsi/:mmsi` -Busca informações de um navio apartir do **MMSI**
  - `/api/v1/vessel/imo/:imo` - Busca informações de um navio apartir do **IMO**
  - `/api/v1/vessel` - Busca todas as informações de navios da base
   <br> 
- **Service Order**
  - `/api/v1/os` - Busca todas as informações de Service Order
  - `/api/v1/os/:os` - Busca informações de um navio apartir do **Número de OS**
