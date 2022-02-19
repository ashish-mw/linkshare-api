const config = require("./config");

const Database = require("better-sqlite3");
const __db = new Database(config.db, {
  verbose: console.log,
  fileMustExist: true,
});

const db = {
  findUser: function ({ username }) {
    return __db
      .prepare(`SELECT id, username, password FROM users WHERE username=?;`)
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
  createShare: function ({ title, link, user }) {
    return __db
      .prepare(
        `INSERT INTO shares (title, link, user) VALUES (@title, @link, @user);`
      )
      .run({
        title,
        link,
        user,
      });
  },
  getUserShares: function ({ user }) {
    return __db
      .prepare(
        `SELECT id, title, link, created_at, updated_at FROM shares WHERE user=? ORDER BY updated_at DESC;`
      )
      .all(user);
  },
  updateShare: function ({ title, updated_at, id, user }) {
    return __db
      .prepare(
        `UPDATE shares SET title=@title, updated_at=@updated_at WHERE id=@id AND user=@user;`
      )
      .run({
        title,
        updated_at,
        user,
        id,
      });
  },
};

module.exports = db;
