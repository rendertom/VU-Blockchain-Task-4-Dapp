const BulveToken = artifacts.require('BulveToken.sol');
const EurToken = artifacts.require('EurToken.sol');
const Farm = artifacts.require('Farm.sol');
const MorkaToken = artifacts.require('MorkaToken.sol');
const RidikasToken = artifacts.require('RidikasToken.sol');

const amountOfTokensInBank = 1000000;
const amountOfEurosForUser = 100;

contract("Farm", (accounts) => {
  const [owner, user] = accounts;

  let bulveToken, farm, eurToken, morkaToken, ridikasToken;
  before(async () => {
    [bulveToken, eurToken, morkaToken, ridikasToken] = await Promise.all([
      BulveToken.new(),
      EurToken.new(),
      MorkaToken.new(),
      RidikasToken.new(),
    ]);

    farm = await Farm.new(bulveToken.address, eurToken.address, morkaToken.address, ridikasToken.address);

    await bulveToken.transfer(farm.address, amountOfTokensInBank);
    await morkaToken.transfer(farm.address, amountOfTokensInBank);
    await ridikasToken.transfer(farm.address, amountOfTokensInBank);

    await eurToken.transfer(user, amountOfEurosForUser, { from: owner });
  });

  describe('EUR (Stable Euro Token) deployment', async () => {
    it('has a name', async () => {
      const name = await eurToken.name();
      assert.equal(name, 'Stable Euro Token');
    });

    it("owner has euros", async () => {
      const [totalSupply, ownerBalance] = await Promise.all([
        eurToken.totalSupply(),
        eurToken.balanceOf(owner)
      ]);

      const unusedSupply = totalSupply.toNumber() - amountOfEurosForUser;
      assert.equal(ownerBalance.toNumber(), unusedSupply);
    });

    it("user has euros", async () => {
      const balance = await eurToken.balanceOf(user);
      assert.equal(balance.toNumber(), amountOfEurosForUser);
    });
  });

  describe('BULVE (Bulve Token) deployment', async () => {
    it('has a name', async () => {
      const name = await bulveToken.name();
      assert.equal(name, 'Bulve Token');
    });
  });

  describe('MORKA (Morka Token) deployment', async () => {
    it('has a name', async () => {
      const name = await morkaToken.name();
      assert.equal(name, 'Morka Token');
    });
  });

  describe('RIDIKAS (Ridikas Token) deployment', async () => {
    it('has a name', async () => {
      const name = await ridikasToken.name();
      assert.equal(name, 'Ridikas Token');
    });
  });

  describe('Farm deployment', async () => {
    it('has a name', async () => {
      const name = await farm.name();
      assert.equal(name, 'Farm');
    });

    it('contract has tokens', async () => {
      let balance = await bulveToken.balanceOf(farm.address);
      assert.equal(balance.toNumber(), amountOfTokensInBank);
    })
  });

  describe('Farming tokens', async () => {
    testFarming({
      getToken: () => bulveToken,
      tokenName: 'BULVE',
    });

    testFarming({
      getToken: () => morkaToken,
      tokenName: 'MORKA',
    });

    testFarming({
      getToken: () => ridikasToken,
      tokenName: 'RIDIKAS',
    });
  });

  async function testFarming({ getToken, tokenName }) {
    const vegetableAmount = 50;
    it(`Rewards investors for staking ${tokenName} tokens`, async () => {
      let result;
      result = await eurToken.balanceOf(user);
      assert.equal(result.toNumber(), amountOfEurosForUser, 'investor EUR wallet balance correct before staking');

      await farm.stakeTokens(vegetableAmount, tokenName, { from: user });

      result = await eurToken.balanceOf(user);
      assert.equal(result.toNumber(), amountOfEurosForUser - vegetableAmount, 'investor EUR wallet balance correct after staking');

      result = await eurToken.balanceOf(farm.address);
      assert.equal(result.toNumber(), vegetableAmount, 'farm EUR balance correct after staking');

      result = await farm.getUserBalance(tokenName, { from: user });
      assert.equal(result.toNumber(), vegetableAmount, 'investor EUR correct after staking');

      result = await farm.isUserStaking(tokenName, { from: user });
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking');

      await farm.issueTokens(tokenName, { from: owner });

      result = await getToken().balanceOf(user);
      assert.equal(result.toNumber(), vegetableAmount, `investor ${tokenName} wallet balance correct after issuance`);

      result = await getToken().balanceOf(farm.address);
      assert.equal(result.toNumber(), amountOfTokensInBank - vegetableAmount, `investor ${tokenName} wallet balance correct after issuance`);

      await farm.unstakeTokens(tokenName, { from: user });

      result = await eurToken.balanceOf(user);
      assert.equal(result.toNumber(), amountOfEurosForUser, 'investor EUR wallet balance correct after staking');

      result = await eurToken.balanceOf(farm.address);
      assert.equal(result.toNumber(), 0, 'Farm EUR balance correct after staking');

      result = await farm.getUserBalance(tokenName, { from: user });
      assert.equal(result.toNumber(), 0, 'investor staking balance correct after staking');

      result = await farm.isUserStaking(tokenName, { from: user });
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking');
    });
  }
});