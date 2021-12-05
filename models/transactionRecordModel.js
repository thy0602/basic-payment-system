const db = require("../db/db");
const tableName = "transaction_record";
const PKFieldName = "id";

exports.getAllSortedByTime = async () => {
    const res = await db.getAllOrderByField(tableName, "time");
    return res;
}

// Can get record by id or username
exports.getByAField = async (fieldname, value) => {
    const res = await db.getByAField(tableName, fieldname, value);
    return res;
}

exports.create = async (entity) => {
    const res = await db.create(tableName, entity);
    return res;
}
