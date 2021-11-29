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
// Test dapp:            cd client && npm test
// Run dev server:       cd client && npm run start
// Build for production: cd client && npm run build