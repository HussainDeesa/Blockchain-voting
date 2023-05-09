import Web3 from 'web3';
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	console.log(window.ethereum.enable());
	console.log(window.web3.currentProvider);
	web3 = new Web3(window.web3.currentProvider);
	console.log('Web3: ', web3);
	console.log(web3.eth.net.getId());
} 
else {
	const provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/29bcae4ee7454a118a2b0f0f4d86c0e0');
	web3 = new Web3(provider);
	console.log('Web3 else: ', web3);
}

export default web3;
