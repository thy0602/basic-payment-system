const db = require("../db/db");
const tableName = "admin";
const PKFieldName = "username";

exports.getAll = async () => {
    const res = await db.getAll(tableName);
    return res;
}

exports.getByUsername = async (username) => {
    const res = await db.getByAField(tableName, PKFieldName, username);
    return res;
}