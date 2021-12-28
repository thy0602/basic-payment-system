const db_query = require("../db/db");
const schema = 'public';
const pgp = require('pg-promise')({
    capSQL: true,
});
const { db } = require('../db/db_config.js');

const tableName = "transaction_record";
const tableFields = {
    id: 'transaction_id',   // Primary Key
    amount: 'amount',
    created: 'created_at',
    username: 'username',
    type: 'type'
}


exports.getAllSortedByTime = async () => {
    const res = await db_query.getAllOrderByField(tableName, tableFields.created, "DESC");
    return res;
}

// Can get record by id or username
exports.getByAField = async (fieldname, value) => {
    const res = await db_query.getByAField(tableName, fieldname, value);
    return res;
}

exports.create = async (entity) => {
    const res = await db_query.create(tableName, entity);
    return res;
}

exports.createTransaction = async (transaction, user) => {
    try{
        const res = await db_query.createTransaction(transaction, user);
        return res;
    } catch(err){
        throw err;
    }
}

exports.finalizeTransaction = async (transaction, admin) => {
    try{
        const res = await db_query.finalizeTransaction(transaction, admin);
        return res;
    } catch(err){
        throw err;
    }
}

exports.getAllTransactionByUsername = async (username) => {
    const res = await db_query.getAllTransactionByUsername(tableName, tableFields.created, "DESC", username);
    return res;
}
