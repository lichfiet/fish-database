const sql = require('./connection.js')



const insertFish = async (fishname) => {
    const insertFish = await sql`INSERT INTO fishData SELECT (SELECT MAX(fishid) + 1 FROM fishdata) as fishid, ${fishname}`
    return insertFish
}

const getFish = async (fishname) => {
    fishSearchName = sql`WHERE fishname = ${fishname}`
    if (fishname == "" || fishname == "*") {
        fishSearchName = sql``
    }

    const getFish = await sql`SELECT * FROM fishData ${fishSearchName}`
    return getFish
}

const deleteFish = async (fishname, fishid) => {
    console.log(fishname, fishid)
    let where = sql`WHERE fishname = ${fishname}`
    if (fishid != undefined) {
        where = sql`WHERE fishid = ${fishid}`
    } else if (fishname == "") {
        where = sql``
    }

    const deleteFish = await sql`DELETE FROM fishData ${where}`
    return deleteFish
}

module.exports = {
    insertFish: insertFish,
    getFish: getFish,
    deleteFish: deleteFish
}