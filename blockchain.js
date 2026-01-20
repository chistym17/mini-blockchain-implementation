const Block = require("./block");

class Blockchain {
    constructor() {
        this.chain = [this.creategenesisblock()];
        this.difficulty = 3;

    }

    creategenesisblock() {
        return new Block(
            0,
            new Date.toString(),
            "Genesis Block",
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

            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;

            if (currentBlock.previousHash !== previousBlock.hash)
                return false;

            return true;

        }
    }


}
module.exports = Blockchain;