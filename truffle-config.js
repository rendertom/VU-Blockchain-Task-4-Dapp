const HDWalletProvider = require("truffle-hdwallet-provider");

const metaMaskMnemonic = 'repair whale prevent survey orange change tent hard depend faint person random';
const infuraApiKey = '9ce0aadbd2604b55b788845ee838be87';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: "./client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(metaMaskMnemonic, `https://ropsten.infura.io/v3/${infuraApiKey}`);
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    },
    compilers: {
      solc: {
        version: "^0.5.0"
      }
    }
  }
};


// Compile:              truffle compile
// Migrate:              truffle migrate
// Test contracts:       truffle test
// Deploy to Ropsten:    truffle deploy --network ropsten
// Test dapp:            cd client && npm test
// Run dev server:       cd client && npm run start
// Build for production: cd client && npm run build
