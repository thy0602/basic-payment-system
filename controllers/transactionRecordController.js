const router = require('express').Router();
const TransactionRecord = require("../models/transactionRecordModel");

router.get('/', async (req, res) => {
    try {
        const response = await TransactionRecord.getAllSortedByTime();
        if (typeof response === 'undefined')
            res.status(500).send("Internal server error");
            
        res.status(200).send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const response = await TransactionRecord.create(req.body);
        if (typeof response === 'undefined')
            res.status(500).send("Internal server error");

        res.status(200).send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports = router;