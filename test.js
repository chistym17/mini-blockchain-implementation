const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

const myKey = ec.genKeyPair();
const myWalletAddress = myKey.getPublic("hex");

const otherKey = ec.genKeyPair();
const otherWalletAddress = otherKey.getPublic("hex");

const coin = new Blockchain();

console.log("Mining first block (reward)...");
coin.minePendingTransactions(myWalletAddress);

console.log("My balance:", coin.getBalanceOfAddress(myWalletAddress));

const tx1 = new Transaction(myWalletAddress, otherWalletAddress, 20);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log("Mining second block...");
coin.minePendingTransactions(myWalletAddress);

console.log("My balance:", coin.getBalanceOfAddress(myWalletAddress));
console.log("Other balance:", coin.getBalanceOfAddress(otherWalletAddress));
