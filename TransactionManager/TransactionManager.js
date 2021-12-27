const transactionRecordModel = require("../models/transactionRecordModel");
const adminModel = require("../models/adminModel");

class Singleton {
  add(transaction) {
    this.queue.push(transaction);
    this.update();
  }
  async update() {
    if (!this.isUpdating) {
      this.isUpdating = true;
      while (this.queue.length != 0) {
        const transaction = this.queue.shift();

        const admin = await adminModel.getAll(this.admin);
        admin.balance = Number(admin.balance) + Number(transaction.amount);

        const res = await transactionRecordModel.finalizeTransaction(transaction, admin);
        console.log("TransactionManager/update_transaction with ID",transaction.transaction_id, res.isFinalized ? "Done" : "Error " + res.message);
      }
      this.isUpdating = false;
    }
  }
  constructor() {
    this.admin = "admin1";
    this.queue = [];
    this.isUpdating = false;
  }
}

module.exports = new Singleton();
