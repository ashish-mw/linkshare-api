--
-- if you wish to create the database from scratch
-- delete linkshare.db and run these queries
--

CREATE TABLE users
(
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  username VARCHAR(256) NOT NULL UNIQUE,
  password VARCHAR(256) NOT NULL
);

CREATE TABLE shares
(
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  user INTEGER NOT NULL,
  title VARCHAR(256) NOT NULL,
  link TEXT NOT NULL,
  FOREIGN KEY(user) REFERENCES users(id)
);
