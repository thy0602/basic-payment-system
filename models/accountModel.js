const db = require("../db/db");
const tableName = "account";
const PKFieldName = "username";

exports.getAll = async () => {
    const res = await db.getAll(tableName);
    return res;
}

exports.getByUsername = async (username) => {
    const res = await db.getByAField(tableName, PKFieldName, username);
    return res;
}

exports.create = async (entity) => {
    const res = await db.create(tableName, entity);
    return res;
}

exports.update = async (PKvalue, entity) => {
    const res = await db.update(tableName, PKFieldName, PKvalue, entity);
    return res;
}

exports.delete = async (PKvalue) => {
    const res = await db.delete(tableName, PKFieldName, PKvalue);
    return res;
}