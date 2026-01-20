const Block = require("./block");

class Blockchain {
    constructor() {
        this.chain = [this.creategenesisblock()];

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
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }


}
module.exports = Blockchain;