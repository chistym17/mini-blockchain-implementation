const Block = require("./block");
const Transaction = require("./transaction");

class Blockchain {
    constructor() {
        this.chain = [this.creategenesisblock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 50;

    }

    creategenesisblock() {
        return new Block(
            0,
            new Date.toString(),
            [],
            "0"

        );
    }
    getLatesBlock() {
        return this.chain(this.chain.length - 1);
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    ischainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransactions())
                return false;

            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;

            if (currentBlock.previousHash !== previousBlock.hash)
                return false;

            return true;

        }
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress)
            throw new Error("Transaction must include valid addresses")

        if (!transaction.isValid())
            throw new Error("Transaction not valid")

        this.pendingTransactions.push(transaction);

    }

    minePendingTransactions(minerAddress) {
        const rewardTx = new Transaction(null, minerAddress, this.miningReward)
        this.pendingTransactions.push(rewardTx);

        const block = new Block(this.chain.length,
            new Date().toISOString(),
            this.pendingTransactions,
            this.getLatesBlock.hash)

        block.mineblock(this.difficulty);
        this.chain.push(block);

        this.pendingTransactions = [];

    }


}
module.exports = Blockchain;