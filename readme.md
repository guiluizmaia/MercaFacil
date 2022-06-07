# Processo Seletivo Backend Mercafácil

O objetivo deste teste é avaliar seu desempenho em desenvolver uma solução de integração entre sistemas.

O problema consiste em receber 1 ou mais contatos de celulares através de uma API Rest e adicioná-los ao banco de dados do cliente Macapá ou do cliente VareJão.

Fluxo de Ações

- A API receberá um JSON via POST contendo o nome e celular;
- O cliente deverá estar autenticado para inserir o contato na base
- O contato deverá ser inserido no banco de dados do cliente seguindo as regras de cada cliente

Especificações da API:

- A autenticação será através de um token JWT no Authorization Header
- Cada cliente tem 1 uma chave única
- A lista de contatos que será inserido em cada cliente está no arquivo contato.json

Especificações do Cliente Macapá:

- Banco de dados Mysql
- Formato do Nome é somente maiúsculas
- O formato de telefone segue o padrão +55 (41) 93030-6905
- Em anexo está o sql de criação da tabela

Especificações do Cliente VareJão:

- Banco de dados Postgresql
- Formato do Nome é livre
- O formato de telefone segue o padrão 554130306905
- Em anexo está o sql de criação da tabela

A criação de um ambiente de testes usando Docker para simular o banco de dados do cliente é altamente recomendada. A solução poderá ser desenvolvida em Golang ou Node.js. Fique livre para desenhar a solução da maneira que achar mais conveniente e supor qualquer cenário que não foi abordado nas especificações acima. Se, por qualquer motivo, você não consiga completar este teste, recomendamos que nos encaminhe o que foi desenvolvido de qualquer maneira. A falta de cumprimento de alguns dos requisitos aqui descritos não implica necessariamente na desconsideração do candidato.

## Bibliotecas

- Celebrate: para validar os dados das requisições
- Tsyringe: para injeção de dependência
- Jest: para testes
- Bcryptjs: para criar um hash da senha
- Jsonwebtoken: para criar o token jwt
- Typeorm: orm usado para conectar e usar os 3 bancos
- Swagger: para documentação

## Testes Unitários

Os testes unitários estão cobrindo 100% de toda a camada de regra de negócio (services)
São feitos usando Jest

## Fluxo

Para testar basta rodar

`docker-compose up`

Nesse processo iniciará 3 bancos de dados (2 PostgreSQL e 1 MySQL), rodará as migrations para a criação da tabela e subirá a aplicação. 1 Banco PostgreSQL é somente para a autenticação. A migration do banco de dados para autenticação cria dois clientes.

Para autenticação usamos a rota de loign

Exemplo:

POST - `/login`
EXEMPLO DE BODY - <br />`{ "email": "test@macapa.com", "pass": "1234" }`

O Email também pode ser `test@varejao.com`, essa rota retornará o token de autenticação

POST - `/contacts`
EXEMPLO DE BODY - <br />`{ "contacts": [ { "name": "Srta. Isabelly Castro", "cellphone": "5541959365078" }, { "name": "Ana Julia da Rocha", "cellphone": "5541923038062" }] }`

Nessa rota se deve autenticar com o token recebido no login

Rota para documentação:
GET - `/api-doc/v1`

A documentação é toda feita com swagger

## Possíveis melhorias

- Tornar a requisição assincrona, como não há limites de quantos contatos podem ser enviados em uma só requisição, tornar ela assincrona seria uma boa estratégia. Poderia ser usado algum serviço de mensageria ao inves do REST, como por exemplo RabbitMQ. Ou até mesmo usar um sistema de fila ja pré pronto

- Adicionar Testes de ponta a ponta, para isso necessitaria de um banco de dados específicos para esses testes
