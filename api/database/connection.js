const postgres = require("postgres");

const CONNECTION_URL = "postgresql://user:password@host:5432/db";
const PGUSER = "postgres";
const PGPASSWORD = "postgres";
// export const sql = postgres({ host: PGHOST, database: PGDATABASE, username: PGUSER, password: PGPASSWORD, port: 5432 });

const sql = postgres({
  connectionString: CONNECTION_URL,
  host: "api-postgres-1",
  user: PGUSER,
  password: PGPASSWORD,
});

module.exports = sql;
