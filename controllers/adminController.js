const adminModel = require("../models/adminModel");
const transacRecordModel = require("../models/transactionRecordModel");
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
        });
    } catch (error) {
        console.log("admin get / error:", error);
        res.status(400).send(error.message);
    }
});

module.exports = router;
