const BulveToken = artifacts.require('BulveToken.sol');
const EurToken = artifacts.require('EurToken.sol');
const MorkaToken = artifacts.require('MorkaToken.sol');
const RidikasToken = artifacts.require('RidikasToken.sol');

const amountOfEurosForUser = 100;

contract("Farm", (accounts) => {
  const [owner, user] = accounts;

  let bulveToken, eurToken, morkaToken, ridikasToken;
  before(async () => {
    [bulveToken, eurToken, morkaToken, ridikasToken] = await Promise.all([
      BulveToken.new(),
      EurToken.new(),
      MorkaToken.new(),
      RidikasToken.new(),
    ]);

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
});