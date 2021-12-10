//pg
const pgp = require('pg-promise')({
    capSQL: true,
});

const cn = {
    user: 'postgres',
    host: 'localhost',
    database: 'payment_system',
    password: 'Huunhan0811',
    port: 5432,
    max: 30,
};

const sm = 'public';

const db = pgp(cn);

exports.load = async tbname => {
    const table = new pgp.helpers.TableName({ table: tbname, schema: sm });
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/load:', error);
    }
};

exports.get = async (tbname, fieldname, value) => {
    const table = new pgp.helpers.TableName({ table: tbname, schema: sm });
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "${fieldname}" = '${value}'`, table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/get:', error);
    }
};

exports.add = async (tbname, entity) => {
    const table = new pgp.helpers.TableName({ table: tbname, schema: sm });
    const qStr = pgp.helpers.insert(entity, null, table) + "RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log('error db/add:', error);
    }
};
