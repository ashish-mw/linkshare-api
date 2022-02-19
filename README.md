# linkshare api

SQLite3 is used as a database for this project. A sample db with just empty
tables are provided as `linkshare.db.example`. The file `linkshare.sql` has
DDL queries for the tables.

## Postman collection

1. Open postman
2. Import > Link
3. https://www.getpostman.com/collections/8c4d8c4d9a487e6f3cf6

## Getting started

```
$ git clone git@github.com:ashish-mw/linkshare-api.git
$ cd linkshare-api
$ nvm use # if you're using nvm
$ npm i
$ cp .env.example .env
$ cp linkshare.db.example linkshare.db
$ npm start # or npm run dev
```