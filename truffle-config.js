// require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
// const { INFURA_API_KEY, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    goerli: {
      provider: () => new HDWalletProvider('wear crush alpha fly floor legend unhappy dutch amazing trumpet require anger',
      'https://goerli.infura.io/v3/44799d6cf93c4abc8890c892de23c3fb'),
      network_id: '5',
      gas: 4465030
    }
  }
};