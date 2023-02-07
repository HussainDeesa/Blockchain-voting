import web3 from './web3';
import Election from './Build/Election.json';

export default address => {
    
    Election.abi;
    console.log(address);
    return new web3.eth.Contract(
        Election.abi,
        address
    );  
};


// import web3 from './web3';
// import Election from './Build/Election.json';


// const instance = new web3.eth.Contract(
// 	Election.abi,
//     '0x862b0a8c814a8145f800d619406add6be2e0b07b'
// );
// // const instance = new web3.eth.Contract(
// // 	JSON.parse(ElectionFactory.interface),
// //     '0xF5d3574DDc21D8Bd8bcB380de232cbbc8161234e'
// // );
// console.log(instance);
// export default instance;



