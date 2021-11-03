# 4TOMIK-PROJECT

## Installation

$ npm install

## Running the app

$ npm install
$ npm run build
$ npm run typeorm:win migration:generate -- -n InitialSchema
$ npm run typeorm:win migration:create -- -n UbigeoPeru
$ npm run start:dev

## Test

$ npm run test
$ npm run test:e2e
$ npm run test:cov

## Environment variables

MYSQL_4TOMIK_PROJECT=mysql://{user}:{password}@{host}:{port}/{database}
MYSQL_4TOMIK_PROJECT=mysql://root:{...}@localhost:3006/4tomik