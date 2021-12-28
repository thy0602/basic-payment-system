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

exports.createTransaction = async (transaction, user) => {
    try{
        const res = await db.createTransaction(transaction, user);
        return res;
    } catch(err){
        throw err;
    }
}

exports.finalizeTransaction = async (transaction, admin) => {
    try{
        const res = await db.finalizeTransaction(transaction, admin);
        return res;
    } catch(err){
        throw err;
    }
}

exports.getAllTransactionByUsername = async (username) => {
    const res = await db.getAllTransactionByUsername(tableName, tableFields.created, "DESC", username);
    return res;
}
