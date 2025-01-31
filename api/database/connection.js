const postgres = require('postgres');

const CONNECTION_URL = "postgresql://user:password@localhost:5432/db";

const PGHOST = process.env.PGHOST;
const PGPORT = 5432;
const PGDATABASE = "db";
const PGUSER = "postgres";
const PGPASSWORD = "postgres";

// export const sql = postgres({ host: PGHOST, database: PGDATABASE, username: PGUSER, password: PGPASSWORD, port: 5432 });

const sql = postgres({ connectionString: CONNECTION_URL, user: PGUSER, password: PGPASSWORD });



module.exports = sql;