var BulveToken = artifacts.require("BulveToken.sol");
var EurToken = artifacts.require("EurToken.sol");
var Farm = artifacts.require("Farm.sol");
var MorkaToken = artifacts.require("MorkaToken.sol");
var RidikasToken = artifacts.require("RidikasToken.sol");

const amountOfTokensInBank = 1000000;
const amountOfEurosForUser = 100;

module.exports = async function(deployer, network, accounts) {
  const [owner, user] = accounts;

  await deployer.deploy(BulveToken);
  const bulveToken = await BulveToken.deployed();

  await deployer.deploy(EurToken);
  const eurToken = await EurToken.deployed();

  await deployer.deploy(MorkaToken);
  const morkaToken = await MorkaToken.deployed();

  await deployer.deploy(RidikasToken);
  const ridikasToken = await RidikasToken.deployed();

  await deployer.deploy(Farm, bulveToken.address, eurToken.address, morkaToken.address, ridikasToken.address);
  const farm = await Farm.deployed();

  await bulveToken.transfer(farm.address, amountOfTokensInBank);
  await morkaToken.transfer(farm.address, amountOfTokensInBank);
  await ridikasToken.transfer(farm.address, amountOfTokensInBank);

  await eurToken.transfer(user, amountOfEurosForUser, { from: owner });
};
