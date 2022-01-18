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
    created_at: 'created_at',
    username: 'username',
    type: 'type'
}


exports.getAllSortedByTime = async () => {
    try{
        const res = await db_query.getAllOrderByField(tableName, tableFields.created_at, "DESC");
        return res;
    } catch(err){
        console.log("Error transactionRecordModel/getAllSortedByTime:", err);
        throw err;
    }
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
        console.log("Error createTransaction:", err);
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
    const res = await db_query.getAllTransactionByUsername(tableName, tableFields.created_at, "DESC", username);
    return res;
}

exports.getNumberTransactionsOfAType = async (type, optionSort = "DESC") => {
    const table = new pgp.helpers.TableName({ table: tableName, schema: schema });
    let typeVal = (type == "In") ? 0 : 1; 
    const queryStr = pgp.as.format(
        `SELECT COUNT(*) FROM $1 WHERE "type" = ${typeVal}`,
        table
    );

    try {
        const res = await db.one(queryStr);
        return res.count;
    } catch (e) {
        console.log("Error transactionRecordModel/getInTransactions", e);
    }
    
    return res;
}
