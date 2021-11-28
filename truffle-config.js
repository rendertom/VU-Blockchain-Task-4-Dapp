const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545
    }
  }
};


// Compile:              truffle compile
// Migrate:              truffle migrate
// Test contracts:       truffle test
// Test dapp:            cd client && npm test
// Run dev server:       cd client && npm run start
// Build for production: cd client && npm run build