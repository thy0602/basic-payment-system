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
    phone: 'phone',
    is_deleted: 'is_deleted'
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

// generic way to skip NULL/undefined values for strings/boolean
function isSkipCol(col) {
    return {
        name: col,
        skip: function () {
            var val = this[col];
            return val === null || val === undefined;
        }
    };
}

// generic way to skip NULL/undefined values for integers,
// while parsing the type correctly:
function isSkipIntCol(col) {
    return {
        name: col,
        skip: function () {
            var val = this[col];
            return val === null || val === undefined;
        },
        init: function () {
            return parseInt(this[col]);
        }
    };
}

// Creating a reusable ColumnSet for all updates:
var csGeneric = new pgp.helpers.ColumnSet([
    isSkipCol(tableFields.username),
    isSkipIntCol(tableFields.balance),
    isSkipCol(tableFields.password),
    isSkipCol(tableFields.phone),
    isSkipCol(tableFields.is_deleted)
], {table: tableName});

exports.update = async (PKvalue, entity) => {
    const queryStr = pgp.helpers.update(entity, csGeneric) + ` WHERE "username" = '${PKvalue}' RETURNING *`;
    const res = await db.one(queryStr);
    return res;
}

exports.getAllOrderByUsername = async (optionSort) => {
    const res = await db_query.getAllOrderByField(tableName, tableFields.username, optionSort);
    return res;
}

exports.topup = async (transaction, user) => {
    try {
        const res = await db.tx("topup", async (t) => {
            await t.one("UPDATE account SET balance = $1 WHERE username = $2 RETURNING *", [
                user.balance,
                user.username,
            ]);
            await db_query.create('transaction_record', transaction);
        });
        return res;
    } catch (err) {
        // failure, ROLLBACK was executed
        return err;
    }
}