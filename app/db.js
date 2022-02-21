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
        `SELECT
        shares.id, shares.title, shares.link, shares.user, shares.created_at, shares.updated_at,
        users.id as user_id, users.username
        FROM shares
        INNER JOIN users ON shares.user = users.id
        WHERE shares.user=? ORDER BY shares.updated_at DESC;`
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
  deleteShare: function ({ id, user }) {
    return __db.prepare(`DELETE FROM shares WHERE id=@id AND user=@user;`).run({
      user,
      id,
    });
  },
  getSharesCount: function () {
    return __db.prepare(`SELECT COUNT(id) as count FROM shares;`).get();
  },
  getSharesPublic: function ({ skip, limit }) {
    return __db
      .prepare(
        `SELECT
        shares.id, shares.title, shares.link, shares.user, shares.created_at, shares.updated_at,
        users.id as userid, users.username
        FROM shares
        INNER JOIN users ON userid = shares.user
        ORDER BY shares.created_at DESC LIMIT ? OFFSET ?;`
      )
      .all(limit, skip);
  },
};

module.exports = db;
