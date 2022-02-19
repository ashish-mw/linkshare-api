const config = require("./config");

const express = require("express");
const app = express();
const routes = require("./routes");

const { notFound, errorHandler } = require("./middlewares");

// routes
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

app.listen(config.port, (err) => {
  if (err) {
    console.error(`⚠️⚠️ can't start server on ${config.port} ⚠️⚠️`);
    process.exit(1);
  }

  console.log(`server 🏃‍♂️🏃‍♂️💨 on ${config.port}`);
});
