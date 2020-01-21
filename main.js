const SHA256 = require('crypto-js/sha256')

class Block{
	constructor(index=0, timestamp, data, prevHash=""){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.prevHash = prevHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index+this.timestamp+this.prevHash+ JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesis()];
	}

	createGenesis(){
		return new Block(0, '01/10/2020', 'kiira genesis block', '0');
	}
	getLatest(){
		return this.chain[this.chain.length-1];
	}
	addBlock(newblk){
		newblk.prevHash = this.getLatest().hash;
		newblk.hash = newblk.calculateHash();
		this.chain.push(newblk);
		console.log('adding block', this.chain.length, ": ", newblk.hash);
	}
	validChain() {
		for (let i=1; i<this.chain.length; i++){
			let current = this.chain[i];
			let previous = this.chain[i-1];
			if (current.hash !== current.calculateHash()) {
				return false;
			}
			if (current.prevHash !== previous.hash) {
				return false;
			}
		}

		return true;
	}

}

let kiira = new Blockchain();
kiira.addBlock(new Block(1,'01/21/20','credit usd: 670'));
kiira.addBlock(new Block(2,'01/22/20','credit usd: 440'));
kiira.addBlock(new Block(3,'01/23/20','credit usd: 700'));
kiira.addBlock(new Block(4,'01/25/20','credit usd: 2300'));
kiira.addBlock(new Block(5,'02/05/20','credit usd: 230'));
kiira.addBlock(new Block(6,'02/12/20','credit usd: 300'));

console.log(JSON.stringify(kiira, null, 4));
// kiira.chain[2].data = "credit aud: 33000";

console.log('kiira chain valid?  ', kiira.validChain());
