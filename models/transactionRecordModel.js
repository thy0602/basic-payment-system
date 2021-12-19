const db = require("../db/db");
const tableName = "transaction_record";
const tableFields = {
    id: 'transaction_id',   // Primary Key
    amount: 'amount',
    created: 'created_at',
    username: 'username',
    type: 'type'
}


exports.getAllSortedByTime = async () => {
    const res = await db.getAllOrderByField(tableName, tableFields.created, "DESC");
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
