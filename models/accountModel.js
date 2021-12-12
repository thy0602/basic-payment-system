const db = require("../db/db");
const tableName = "account";
const PKFieldName = "username", pwdFieldName = "password", balFieldName = "balance";

exports.getAll = async () => {
    const res = await db.getAll(tableName);
    return res;
}

exports.getByUsername = async (username) => {
    const res = await db.getByAField(tableName, PKFieldName, username);
    return res[0];
}

exports.create = async (entity) => {
    const res = await db.create(tableName, entity);
    return res;
}

exports.updateBalance = async (PKvalue, entity) => {
    const res = await db.update(tableName, PKFieldName, PKvalue, entity, [balFieldName]);
    return res;
}

exports.delete = async (PKvalue) => {
    const res = await db.delete(tableName, PKFieldName, PKvalue);
    return res;
}