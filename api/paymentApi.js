const express = require("express");
const router = express.Router();

const accountModel = require("../models/accountModel");
const adminModel = require("../models/adminModel");
const transactionRecordModel = require("../models/transactionRecordModel");

const adminUsername = "admin1";

router.get("/", async (req, res) => {
  const username = req.query.username;
  if (!username) {
    res.status(401).send("Need username!");
  }

  const account = await accountModel.getByUsername(username);
  res.status(200).send(account[0].balance);
});

router.post("/", async (req, res) => {
  const { username, password, amount } = req.body;
  console.log(username, password, amount);
  if (!username) {
    res.status(401).send("Need username!");
  }
  const account = await accountModel.getByUsername(username);
  const admin = await adminModel.getAll(adminUsername);
  if (account.balance < amount) {
    res.status(401).send("Insufficient Balance!");
  }
  //const isUser = await bcrypt.compareSync(password, account.password);
  const isUser = password === account.password;
  if (isUser) {
    //proceed payment
    const time = new Date();
    const transaction = {
      amount: amount,
      time: time.toUTCString(),
      type: 1, //pay type
      username: username,
    };
    const res = await transactionRecordModel.create(transaction);
    if (res) {
      //update admin & user balance
      account.balance = Number(account.balance) - Number(amount);
      admin.balance = Number(admin.balance) + Number(amount);
      const updatedAccount = await accountModel.updateBalance(username, {
        balance: account.balance,
      });
      const updatedAdmin = await adminModel.updateBalance(admin.username, {
        balance: admin.balance,
      });
      if (updatedAccount && updatedAdmin) {
        res.status(200).send("Transaction Completed!");
      }
    } else {
      res.status(401).send("Error while creating transaction!");
    }
  } else {
    res.status(401).send("Password Incorrect!");
  }
});

module.exports = router;
