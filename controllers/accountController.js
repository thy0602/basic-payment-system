const router = require('express').Router();
const Account = require("../models/accountModel");

router.get('/', async (req, res) => {
    try {
        const response = await Account.getAll();
        if (typeof response === 'undefined')
            res.status(500).send("Internal server error");
            
        res.status(200).send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const response = await Account.create(req.body);
        if (typeof response === 'undefined')
            res.status(500).send("Internal server error");

        res.status(200).send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.put('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        
        const response = await Account.update(username, req.body);
        if (typeof response === 'undefined')
            res.status(500).send("Internal server error");

        res.status(200).send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.delete('/:username', async (req, res) => {
    try {
        const username = req.params.username;

        response = await Account.delete(username);
        if (typeof response === 'undefined')
            res.status(500).send("Internal server error");
        res.status(200).send(response);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;