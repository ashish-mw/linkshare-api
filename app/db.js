const config = require("./config");

const Database = require("better-sqlite3");
const __db = new Database(config.db, {
  verbose: console.log,
  fileMustExist: true,
});

const db = {
  findUser: function ({ username }) {
    return __db
      .prepare(`SELECT username, password FROM users WHERE username=?;`)
      .get(username);
  },
  insertUser: function ({ username, password }) {
    return __db
      .prepare(
        `INSERT INTO users (username, password) VALUES (@username, @password);`
      )
      .run({
        username,
        password,
      });
  },
};

module.exports = db;
