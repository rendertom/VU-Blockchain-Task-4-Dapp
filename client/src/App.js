import React, { useEffect, useState } from "react";
import getWeb3 from "./utils/getWeb3";

import ChickenToken from "./contracts/ChickenToken.json";
import EurToken from "./contracts/EurToken.json";
import Farm from "./contracts/Farm.json";
import CowToken from "./contracts/CowToken.json";
import GoatToken from "./contracts/GoatToken.json";

import Header from './components/Header';
import Dialog from './components/Dialog';
import Footer from './components/Footer';
import Table from './components/Table';

const App = () => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [chicken, setChicken] = useState({ contract: null, balance: null });
  const [eur, setEur] = useState({ contract: null, balance: null });
  const [cow, setCow] = useState({ contract: null, balance: null });
  const [goat, setGoat] = useState({ contract: null, balance: null });
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

      const [chicken, eur, farm, cow, goat] = await Promise.all([
        initContract(ChickenToken),
        initContract(EurToken),
        initContract(Farm),
        initContract(CowToken),
        initContract(GoatToken),
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

      setChicken(await getContractData(chicken));
      setEur(await getContractData(eur));
      setCow(await getContractData(cow));
      setGoat(await getContractData(goat));
      setFarm({
        contract: farm,
        balance: {
          CHICKEN: await getStakingBalance(farm, 'CHICKEN'),
          COW: await getStakingBalance(farm, 'COW'),
          GOAT: await getStakingBalance(farm, 'GOAT')
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

  const onStakeClick = (value, animal) => {
    value = parseInt(value);
    if (isNaN(value)) return alert("Value is not a number");
    if (value <= 0) return alert("Value should be greater than 0");

    animal = animal.toUpperCase();

    stakeTokens(value, animal);
  };

  const onUnstakeClick = (value, animal) => {
    animal = animal.toUpperCase();
    unstakeTokens(animal);
  };

  const onIssueTokensClick = (animal) => {
    animal = animal.toUpperCase();
    issueTokens(animal);
  }

  if (isLoading) {
    return <div className="main"><h1>loading...</h1></div>
  }

  return (
    <div className="main">
      <Header account={account} balance={eur.balance} />
      <Dialog
        onStakeClick={onStakeClick}
        onUnstakeClick={onUnstakeClick}
      />
      <Table items={[chicken, cow, goat]} farmBalance={farm.balance} />
      <Footer items={[chicken, cow, goat]}
        onIssueTokensClick={onIssueTokensClick}
      />
    </div>
  )
}

export default App;
