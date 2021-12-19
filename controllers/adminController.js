const adminModel = require("../models/adminModel");
const transacRecordModel = require("../models/transactionRecordModel");
const accountModel = require("../models/accountModel");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        // Lấy ra danh sách các transaction mà account đã chi ra (nộp vào cho admin)
        const transactions = await transacRecordModel.getAllSortedByTime();
        const admin = await adminModel.getOne();
        // console.log("admin totalTransactions:", transactions.length);

        res.render("admin/adminHome", {
            transactions: transactions,
            adminBalance: admin.balance,
            totalTransactions: transactions.length,
            cssP: () => "css",
            scriptP: () => "scripts",
            navP: () => "nav",
            footerP: () => "footer",
            title: "Admin Home",
            isHome: 1
        });
    } catch (error) {
        console.log("admin get / error:", error);
        res.status(400).send(error.message);
    }
});

router.get("/manage_user", async (req, res) => {
    try {
        // Lấy ra danh sách users (accounts)
        const accounts = await accountModel.getAll();
        res.render("admin/manageUser", {
            cssP: () => "css",
            scriptP: () => "scripts",
            navP: () => "nav",
            footerP: () => "footer",
            title: "Manage User",
            isUserList: 1,
            users: accounts
        });
    } catch (error) {
        console.log("admin get /manage_user error:", error);
        res.status(400).send(error.message);
    }
});

module.exports = router;
