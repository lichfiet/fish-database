const connection = require("./connection.js");
const seed = require("./seed.js");
const fish = require("./fishMethods.js");

const healthCheck = async () => {
  const health = await connection.query("SELECT 1");
  return health;
};

module.exports = {
  connection: connection,
  seed: seed,
  fish: fish,
  healthCheck: healthCheck,
};
