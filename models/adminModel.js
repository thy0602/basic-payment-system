const db_query = require("../db/db");
const schema = 'public';
const pgp = require('pg-promise')({
    capSQL: true,
});
const { db } = require('../db/db_config.js');

const tableName = "admin";
const tableFields = {
    username: 'username',   // Primary Key
    balance: 'balance',
    password: 'password'
}

exports.getAll = async () => {
    const res = await db_query.getAll(tableName);
    return res;
}

exports.getByUsername = async (username) => {
    const res = await db_query.getByAField(tableName, tableFields.username, username);
    return res;
}
exports.getOne = async () => {
    const res = await db_query.getAll(tableName);
    if (res.length > 0)
        return res[0];
    return null;
}
