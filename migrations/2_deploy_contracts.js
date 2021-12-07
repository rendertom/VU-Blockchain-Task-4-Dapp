var ChickenToken = artifacts.require("ChickenToken.sol");
var EurToken = artifacts.require("EurToken.sol");
var Farm = artifacts.require("Farm.sol");
var CowToken = artifacts.require("CowToken.sol");
var GoatToken = artifacts.require("GoatToken.sol");

const amountOfTokensInBank = 1000000;
const amountOfEurosForUser = 100;

module.exports = async function(deployer, network, accounts) {
  const [owner, user] = accounts;

  await deployer.deploy(ChickenToken);
  const chickenToken = await ChickenToken.deployed();

  await deployer.deploy(EurToken);
  const eurToken = await EurToken.deployed();

  await deployer.deploy(CowToken);
  const cowToken = await CowToken.deployed();

  await deployer.deploy(GoatToken);
  const goatToken = await GoatToken.deployed();

  await deployer.deploy(Farm, chickenToken.address, eurToken.address, cowToken.address, goatToken.address);
  const farm = await Farm.deployed();

  await chickenToken.transfer(farm.address, amountOfTokensInBank);
  await cowToken.transfer(farm.address, amountOfTokensInBank);
  await goatToken.transfer(farm.address, amountOfTokensInBank);
};
