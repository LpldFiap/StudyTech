# Aplicação Backend de API para criação e manipulação de Posts, com Next.js, Node.js e MongoDB
## Desenvolvido para o Tech Challenge de Pós Graduação Fullstack na FIAP

## Grupo
### - Danilo Soares da Silva - RM:354317
### - Gabriel Antunes – RM: 354712
### - Lucas dos Santos Melo – RM:355274
### - Lucas Souza Davanso – RM: 354925
### - Paloma Cristina da Silva Correa – RM:355519


## Sobre o Projeto

Esta é uma aplicação backend construída utilizando Next.js e Node.js, com um banco de dados NoSQL MongoDB. A aplicação é containerizada utilizando Docker e inclui testes automatizados com Jest.

## Índice

- [Instalação](#instalação)
- [Configuração do Docker](#configuração-do-docker)
- [Executando os Testes](#executando-os-testes)
- [Executando a Aplicação](#executando-a-aplicação)
- [Documentação da API](#documentação-da-api)


## Instalação

Primeiro, instale as dependências necessárias:

```bash
npm install
```


## Configuração do Docker

Para construir a imagem Docker da aplicação, utilize o seguinte comando:

```bash
docker build -t studytech:latest --build-arg="MONGO_URI=mongodb+srv://grupotechlpld:{{password}}@techchallengecluster.ebtg6gj.mongodb.net/" .
```
Substitua {{password}} pela senha real do seu cluster MongoDB.


## Executando os testes

Para rodar os testes, utilize o seguinte comando:

```bash
npm run test
```


## Executando a Aplicação

Para iniciar a aplicação, execute o seguinte comando:

```bash
npm run start
```


## Documentação da API

Após iniciar a aplicação, você pode acessar a documentação da API via Swagger no seguinte URL:

[Swagger Doc](http://localhost:3000/api)

