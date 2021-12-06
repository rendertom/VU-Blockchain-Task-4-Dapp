const ChickenToken = artifacts.require('ChickenToken.sol');
const EurToken = artifacts.require('EurToken.sol');
const Farm = artifacts.require('Farm.sol');
const CowToken = artifacts.require('CowToken.sol');
const GoatToken = artifacts.require('GoatToken.sol');

const amountOfTokensInBank = 1000000;
const amountOfEurosForUser = 100;

contract("Farm", (accounts) => {
  const [owner, user] = accounts;

  let chickenToken, farm, eurToken, cowToken, goatToken;
  before(async () => {
    [chickenToken, eurToken, cowToken, goatToken] = await Promise.all([
      ChickenToken.new(),
      EurToken.new(),
      CowToken.new(),
      GoatToken.new(),
    ]);

    farm = await Farm.new(chickenToken.address, eurToken.address, cowToken.address, goatToken.address);

    await chickenToken.transfer(farm.address, amountOfTokensInBank);
    await cowToken.transfer(farm.address, amountOfTokensInBank);
    await goatToken.transfer(farm.address, amountOfTokensInBank);

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

  describe('CHICKEN (Chicken Token) deployment', async () => {
    it('has a name', async () => {
      const name = await chickenToken.name();
      assert.equal(name, 'Chicken Token');
    });
  });

  describe('COW (Cow Token) deployment', async () => {
    it('has a name', async () => {
      const name = await cowToken.name();
      assert.equal(name, 'Cow Token');
    });
  });

  describe('GOAT (Goat Token) deployment', async () => {
    it('has a name', async () => {
      const name = await goatToken.name();
      assert.equal(name, 'Goat Token');
    });
  });

  describe('Farm deployment', async () => {
    it('has a name', async () => {
      const name = await farm.name();
      assert.equal(name, 'Farm');
    });

    it('contract has tokens', async () => {
      let balance = await chickenToken.balanceOf(farm.address);
      assert.equal(balance.toNumber(), amountOfTokensInBank);
    })
  });

  describe('Farming tokens', async () => {
    testFarming({
      getToken: () => chickenToken,
      tokenName: 'CHICKEN',
    });

    testFarming({
      getToken: () => cowToken,
      tokenName: 'COW',
    });

    testFarming({
      getToken: () => goatToken,
      tokenName: 'GOAT',
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

      await farm.unstakeTokens(vegetableAmount, tokenName, { from: user });

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