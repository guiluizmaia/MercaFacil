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

## Fluxo

Para testar basta rodar

`docker-compose up`

Nesse processo iniciará dois bancos de dados (PostgreSQL e MySQL), rodara as migrations para a criação da tabela e subirá a aplicação.

Na criação supus que esse token é gerado em outro serviço, pensando nisso tem uma roda para retornar o token do cliente passado pelo query string da rota.

Exemplo:

GET - `/token?client=macapa`

Esse query string só pode ser macapa e varejao

Com o token retornado se deve coloca-lo no authentication da rota seguinte

POST - `/contacts`
EXEMPLO DE BODY - <br />`{ "contacts": [ { "name": "Srta. Isabelly Castro", "cellphone": "5541959365078" }, { "name": "Ana Julia da Rocha", "cellphone": "5541923038062" }] }`

Rota para documentação:
GET - `/api-doc/v1`

## Possível melhoria

Tornar a requisição assincrona, como não há limites de quantos contatos podem ser enviados em uma só requisição, tornar ela assincrona seria uma boa estratégia. Poderia ser usado algum serviço de mensageria ao inves do REST, como por exemplo RabbitMQ. Ou até mesmo usar um sistema de fila ja pré pronto
