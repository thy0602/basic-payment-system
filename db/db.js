const pgp = require('pg-promise')({
    capSQL: true,
});

const schema = 'public';

const { connection } = require('./db_config.js');

const db = pgp(connection);

// Get all records in a table
exports.getAll = async tableName => {
    const table = new pgp.helpers.TableName({ table: tableName, schema: schema});
    const queryStr = pgp.as.format('SELECT * FROM $1', table);

    try {
        const res = await db.any(queryStr);
        return res;
    } catch(e) {
        console.log("Error db/load", e);
    }
};

exports.getAllOrderByField = async (tableName, fieldname, optionSort = "ASC") => {
    const table = new pgp.helpers.TableName({ table: tableName, schema: schema});
    const queryStr = pgp.as.format(`SELECT * FROM $1 ORDER BY "${fieldname}" ${optionSort}`, table);

    try {
        const res = await db.any(queryStr);
        return res;
    } catch(e) {
        console.log("Error db/load", e);
    }
};

// get records filterd by a fieldname
exports.getByAField = async (tableName, fieldname, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema: schema});
    const queryStr = pgp.as.format(`SELECT * FROM $1 WHERE "${fieldname}"='${value}'`, table);

    try {
        // one: trả về 1 kết quả
        const res = await db.any(queryStr);
        return res;
    } catch(e) {
        console.log("Error db/get", e);
    }
};

// create a record in a table
exports.create = async (tableName, entity) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema: schema});

    const queryStr = pgp.helpers.insert(entity, null, table) + ' RETURNING *';

    try {
        // one: trả về 1 kết quả
        const res = await db.one(queryStr);
        return res;
    } catch(e) {
        console.log("Error db/create", e.message);
    }
};

// update a record in a table fileter by a fieldname
exports.update = async (tableName, fieldname, filterValue, entity) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema: schema});
    const condition = pgp.as.format(` WHERE "${fieldname}"= '${filterValue}'`);

    const queryStr = pgp.helpers.update(entity, null, table) + condition + ' RETURNING *';

    try {
        // one: trả về 1 kết quả
        const res = await db.one(queryStr);
        return res;
    } catch(e) {
        console.log("Error db/update", e);
    }
};

exports.delete = async (tableName, fieldname, value) => {
    const table = new pgp.helpers.TableName({ table: tableName, schema: schema});
    const queryStr = pgp.as.format(`DELETE FROM $1 WHERE "${fieldname}"='${value}'`, table);

    try {
        const res = await db.any(queryStr);
        return true;
    } catch(e) {
        console.log("Error db/delete", e);
    }
}
