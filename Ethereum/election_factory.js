import web3 from './web3';
import ElectionFactory from './Build/ElectionFact.json';

// Goerli deployed address this 
// const instance = new web3.eth.Contract(
// 	ElectionFactory.abi,
//     '0x862b0a8c814a8145f800d619406add6be2e0b07b'
// );

// Ganache deployed address

// const instance = new web3.eth.Contract(
// 	ElectionFactory.abi,
//     '0x411cA30C6D9fEa9EDf2B3De373cF51037636BC53'
// );

//Testing

const instance = new web3.eth.Contract(
    	ElectionFactory.abi,
        '0x92d8097A7F8bE8A8bC5600560494496d34bf85E9' 
    );

console.log(instance);
export default instance;



