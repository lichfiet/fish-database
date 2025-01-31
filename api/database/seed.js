const sql = require('./connection.js')

const checkIfTablesExist = async () => {
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    return tables.length > 0
}

const createTables = async () => {
    const createFishTable = await sql`CREATE TABLE fishData (
    fishid bigint PRIMARY KEY,
    fishname text NOT NULL
 )`
    const createFishData = await sql`INSERT INTO fishData VALUES (1001, 'pike')`
}

module.exports = {
    checkIfTablesExist: checkIfTablesExist,
    createTables: createTables
}