import React, { useEffect, useState } from "react";
import getWeb3 from "./getWeb3";

import BulveToken from "./contracts/BulveToken.json";
import EurToken from "./contracts/EurToken.json";
import Farm from "./contracts/Farm.json";
import MorkaToken from "./contracts/MorkaToken.json";
import RidikasToken from "./contracts/RidikasToken.json";

import "./App.css";

const App = () => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [bulve, setBulve] = useState({ contract: null, balance: null });
  const [eur, setEur] = useState({ contract: null, balance: null });
  const [morka, setMorka] = useState({ contract: null, balance: null });
  const [ridikas, setRidikas] = useState({ contract: null, balance: null });
  const [farm, setFarm] = useState({ contract: null, balance: null });

  useEffect(() => {
    init().catch(console.error);
    async function init() {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setAccount(account);

      const networkId = await web3.eth.net.getId();

      const balanceOf = (contract, _account = account) => contract.methods.balanceOf(_account).call();
      const getStakingBalance = (contract, currency) => contract.methods.getUserBalance(currency).call();
      const initContract = (_token) => {
        const address = _token.networks[networkId];
        return new web3.eth.Contract(_token.abi, address.address, { from: account });
      }

      const [bulve, eur, farm, morka, ridikas] = await Promise.all([
        initContract(BulveToken),
        initContract(EurToken),
        initContract(Farm),
        initContract(MorkaToken),
        initContract(RidikasToken),
      ]);

      const getContractData = async (contract) => {
        return {
          contract: contract,
          balance: await balanceOf(contract),
          left: await balanceOf(contract, farm._address),
          totalSupply: await contract.methods.totalSupply().call(),
          name: await contract.methods.name().call(),
          symbol: await contract.methods.symbol().call(),
        }
      }

      setBulve(await getContractData(bulve));
      setEur(await getContractData(eur));
      setMorka(await getContractData(morka));
      setRidikas(await getContractData(ridikas));
      setFarm({
        contract: farm,
        balance: {
          BULVE: await getStakingBalance(farm, 'BULVE'),
          MORKA: await getStakingBalance(farm, 'MORKA'),
          RIDIKAS: await getStakingBalance(farm, 'RIDIKAS')
        }
      });

      setIsLoading(false);
    }
  }, []);

  const stakeTokens = (amount, currency) => {
    setIsLoading(true);
    farm.contract.methods.stakeTokens(amount, currency).send({ from: account }).on('transactionHash', (hash) => {
      setIsLoading(false);
    })
  }

  const unstakeTokens = (currency) => {
    setIsLoading(true);
    farm.contract.methods.unstakeTokens(currency).send({ from: account }).on('transactionHash', (hash) => {
      setIsLoading(false);
    })
  }

  const issueTokens = (currency) => {
    setIsLoading(true);
    farm.contract.methods.issueTokens(currency).send({ from: account }).on('transactionHash', (hash) => {
      setIsLoading(false);
    })
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }

  return (
    <div>
      <div>
        <button onClick={() => stakeTokens(10, 'BULVE')}>stake bulve tokens</button>
        <button onClick={() => stakeTokens(10, 'MORKA')}>stake morka tokens</button>
        <button onClick={() => stakeTokens(1, 'RIDIKAS')}>stake ridikas tokens</button>
      </div>
      <div>
        <button onClick={() => unstakeTokens('BULVE')}>unstake bulve tokens</button>
        <button onClick={() => unstakeTokens('MORKA')}>unstake morka tokens</button>
        <button onClick={() => unstakeTokens('RIDIKAS')}>unstake ridikas tokens</button>
      </div>
      <div>
        <button onClick={() => issueTokens('BULVE')}>issue bulve tokens</button>
        <button onClick={() => issueTokens('MORKA')}>issue morka tokens</button>
        <button onClick={() => issueTokens('RIDIKAS')}>issue ridikas tokens</button>
      </div>
      <p>User {account}</p>
      <img alt="" id='avatar' src={'https://avatars.dicebear.com/api/avataaars/' + account + '.svg'} />
      <p>Eurai: {eur.balance}</p>
      <div>
        {
          [bulve, morka, ridikas].map((item, index) => {
            return (
              <p key={index}>
                {item.name}: staking balance: {farm.balance[item.symbol]} (EUR)
                rewards: {item.balance}({item.symbol})
                left: {item.left}
                totalSupply: {item.totalSupply}
              </p>
            )
          })
        }
      </div>
    </div>
  )
}

export default App;
