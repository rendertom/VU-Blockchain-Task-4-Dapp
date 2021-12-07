# VU-Blockchain-Task-4-Dapp

Based on [truffle react](https://www.trufflesuite.com/boxes/react) and [Blockchain Tutorial for Beginners](https://www.youtube.com/watch?v=CgXQC4dbGUE)

---

## Back end

1. Make sure you have [truffle](https://www.trufflesuite.com/) installed.
2. Install and run [Ganache](https://www.trufflesuite.com/ganache) to run Ethereum network.
3. Compile contracts: `truffle compile`
4. Migrate contracts:
    - First time: `truffle migrate`
    - Other times: `truffle migrate --reset`
5. To test contracts in CLI, start truffle console: `truffle console`.

---

## Contract tests

1. Run `truffle test` to execute contract tests.

---

## Front end

1. Install and run [Ganache](https://www.trufflesuite.com/ganache) to run Ethereum network.
2. Install and run [MetaMask](https://metamask.io/) on your browser.
3. In MetaMask, select Ganache network. If it does not exist, `Add Network`:
    - Network Name: Ganache
    - New RPC URL: `HTTP://127.0.0.1:7545` (should be the same as displayed in the Ganache app RPC Server section, Port should match to `truffle-config.js` port)
    - Chain ID: 1337
4. In MetaMask, import new account:
    - In Ganache select the second address and click on the KEY icon on the right. Copy the Private Key.
    - In MetaMask, `Import New Account` and paste the private key from step 1.
5. Change directory: `cd client`
6. Run: `npm run start`.

---
