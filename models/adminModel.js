const db = require("../db/db");
const tableName = "admin";
const tableFields = {
    username: 'username',   // Primary Key
    balance: 'balance',
    password: 'password'
}

exports.getAll = async () => {
    const res = await db.getAll(tableName);
    return res;
}

exports.getByUsername = async (username) => {
    const res = await db.getByAField(tableName, PKFieldName, username);
    return res;
}
exports.getOne = async () => {
    const res = await db.getAll(tableName);
    if (res.length > 0)
        return res[0];
    return null;
}
