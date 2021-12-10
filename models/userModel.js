const db = require('./db_test');
const tbname = 'account';
const idfieldName = 'username';

module.exports = {
    all: async () => {
        const res = await db.load(tbname);
        return res;
    },
    get: async username => {
        const res = await db.get(tbname, idfieldName, username);
        if (res.length > 0)
            return res[0];
        else
            return null;
    },
    add: async user => {
        const res = await db.add(tbname, user);
        return res;
    },
}