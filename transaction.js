const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Transaction {
    constructor(fromAddress, toAdress, amount) {
        this.fromAddress = fromAddress;
        this.toAdress = toAdress;
        this.amount = amount;
        this.signature = null;
    }

    calculateHash() {
        return (this.fromAddress + this.toAdress + this.amount);
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic("hex") !== this.fromAddress)
            throw new console.error("You can not sign transaction for other people wallets");

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");

    }

    isValid() {
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length == 0)
            throw new error("No signature in this transaction");

        const publicKey = ec.keyFromPublic(this.fromAddress)
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

module.exports = Transaction;