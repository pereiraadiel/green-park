<h1 align="center">
	API Portaria Condominio Green Park
</h1> 


## Tecnologias utilizadas
- ### [Framework Nest.js](https://nestjs.com)
- ### [Typescript](https://typescriptlang.org)
- ### [Fastify](https://fastify.dev)
- ### [Prisma ORM](https://prisma.io)
- ### [Postgres](https://postgresql.org)
- ### [Yarn](https://yarnpkg.com)
<br/>

## Comandos úteis
### Todos os comandos devem ser executados na pasta [server](./server)
	
- ### Banco de dados

	```sh
	# executar as migrations
	yarn db:migrate

	# executar o seed para popular a tabela lotes
	yarn db:seed

	# executar a visualização do banco de dados no navegador
	yarn db:studio
	```
- ### Aplicação

	```sh
	# executar a aplicação
	yarn start:dev

	# executar testes unitários
	yarn test

	# executar testes unitários com cobertura de código
	yarn test:cov

	# executar testes de integração
	yarn test:e2e
	```