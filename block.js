const crypto = require("crypto");
const { diff } = require("util");

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = 0;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

    }

    calculateHash() {
        return crypto.createHash("sha256")
            .update(
                this.index + this.timestamp
                + JSON.stringify(this.data) + this.previousHash
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

}

module.exports = Block;
