const crypto = require("crypto");
const { diff } = require("util");

class Block {
    constructor(index, timestamp, transactions, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = 0;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

    }

    calculateHash() {
        return crypto.createHash("sha256")
            .update(
                this.index + this.timestamp
                + JSON.stringify(this.transactions)
                + this.previousHash
                + this.nonce
            )
            .digest("hex");
    }

    mineblock(difficulty) {
        const target = Array(difficulty + 1).join("0");
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

    }

    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }

}

module.exports = Block;
