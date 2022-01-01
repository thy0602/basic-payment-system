const Account = require('../models/accountModel');

exports.generateUsername = async () => {
    const res = await Account.getAllOrderByUsername('DESC');
    if (res.length <= 0)
        return 'ID_001';
    const last_username = res[0].username;
    const next_num = parseInt(last_username.slice(3)) + 1;
    return 'ID_' + String(next_num).padStart(3, '0');
}