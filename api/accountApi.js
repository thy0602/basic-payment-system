const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const secretKey = 'ThisIsASecretKey';

const accountModel = require("../models/accountModel");

router.use(function (req, res, next) {
    if (req) {
        if (!req.body.username && !req.query.username)
        res.status(401).send("Need username!");
    }
    next();
});

router.post("/", async (req, res) => {
    const { username, token, new_user } = req.body;
    res.setHeader('Access-Control-Allow-Origin', '*');

    let is_err = false;
    jwt.verify(token, secretKey, function(err, decoded) {
        if (err) {
            console.log("Error 1:", err.message);
            is_err = true;
            return res.status(400).send({ error: "Unauthorized", message: "Unauthorized" });
        }

        console.log("Decoded: ", decoded);
        if (decoded.username != username) {
            is_err = true;
            return res.status(400).send({ error: "Unauthorized", message: "Invalid user" });
        }
    });
    if (is_err)
        return;

    try {
        const entity = {
            username: new_user, 
            balance: 0,
            password: null,
            phone: null,
            is_deleted: false
        }
    
    const response = await accountModel.create(entity);
    console.log("Created user: ", response);
    res.status(200).send(response);
    } catch (e) {
        res.status(400).send({ error: e });
    }
    
});

module.exports = router;
