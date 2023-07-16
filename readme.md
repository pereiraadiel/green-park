<h1 align="center">
	API Portaria Condominio Green Park
</h1> 


## 💻 Tecnologias utilizadas
- ### [Framework Nest.js](https://nestjs.com) - Framework de Node.js
- ### [Typescript](https://typescriptlang.org) - Tipagem estática
- ### [Fastify](https://fastify.dev) - API Rest
- ### [Prisma ORM](https://prisma.io) - ORM
- ### [Postgres](https://postgresql.org) - banco de dados
- ### [Yarn](https://yarnpkg.com) - gerenciador de pacotes
- ### [Pdf Toolz](https://www.npmjs.com/package/pdf-toolz) - split de páginas
- ### [PdfScraper](https://www.npmjs.com/package/pdf-scraper) - extrair texto do pdf
- ### [PdfKit](https://pdfkit.org) - gerar relatório
<br/>

## 🐳 Executar em ambiente Docker
Executar na pasta raiz do projeto
```sh
docker-compose up -d
```

## 💡 Comandos úteis

> ### Todos os comandos devem ser executados na pasta [server](./server)


<br/>


- ### 🛠️ Configuração do ambiente local
	Para executar localmente a aplicação (sem docker) é necessário instalar no computador
	os seguintes softwares que sao dependencias da biblioteca [pdf-toolz](https://www.npmjs.com/package/pdf-toolz)
	```sh
	# ubuntu
	sudo apt install pdftk graphicsmagick ghostscript
	```

	É necessário também uma instancia do postgres e configurar a variavel de ambiente no arquivo `.env.example` e renomear o arquivo para `.env`
- ### 💾 Banco de dados

	```sh
	# executar as migrations
	yarn db:migrate

	# executar o seed para popular a tabela lotes
	yarn db:seed

	# executar a visualização do banco de dados no navegador
	yarn db:studio
	```


- ### ⚡ Aplicação
	```sh
	# executar a aplicação em modo 'watch'
	yarn start:dev

	# executar testes unitários
	yarn test

	# executar testes unitários com cobertura de código
	yarn test:cov
	```