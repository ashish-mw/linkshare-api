# linkshare api

SQLite3 is used as a database for this project. A sample db with just empty
tables are provided as `linkshare.db.example`. The file `linkshare.sql` has
DDL queries for the tables.

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