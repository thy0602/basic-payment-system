const db_query = require("../db/db");

const schema = 'public';
const pgp = require('pg-promise')({
    capSQL: true,
});
const { db } = require('../db/db_config.js');

const tableName = "account";
const tableFields = {
    username: 'username',   // Primary Key
    balance: 'balance',
    password: 'password',
    phone: 'phone'
}

exports.getAll = async () => {
    const res = await db_query.getAll(tableName);
    return res;
}

exports.getByUsername = async (username) => {
    const res = await db_query.getByAField(tableName, tableFields.username, username);
    return res;
}

exports.create = async (entity) => {
    const res = await db_query.create(tableName, entity);
    return res;
}

exports.update = async (PKvalue, entity) => {
    const res = await db_query.update(tableName, tableFields.username, PKvalue, entity);
    return res;
}

exports.delete = async (PKvalue) => {
    const res = await db_query.delete(tableName, tableFields.username, PKvalue);
    return res;
}

exports.getOneByUsername = async (username) => {
    const res = await db_query.getByAField(tableName, tableFields.username, username);
    if (res.length > 0)
        return res[0];
    return null;
}
