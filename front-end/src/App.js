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
import Button from './components/Button';

const App = () => {
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [web3, setWeb3] = useState(null);
  const [needUpdate, setNeedUpdate] = useState(false);

  const [chicken, setChicken] = useState({ contract: null, balance: null });
  const [eur, setEur] = useState({ contract: null, balance: null });
  const [cow, setCow] = useState({ contract: null, balance: null });
  const [goat, setGoat] = useState({ contract: null, balance: null });
  const [farm, setFarm] = useState({ contract: null, balance: null });

  useEffect(() => {
    init().catch(console.error);
    async function init() {
      const web3 = await getWeb3();
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
  }, []);

  const balanceOf = (contract, _account = account) => contract.methods.balanceOf(_account).call();
  const getStakingBalance = (contract, currency) => contract.methods.getUserBalance(currency).call();
  const initContract = async (_token) => {
    const networkId = await web3.eth.net.getId();
    const address = _token.networks[networkId];
    return new web3.eth.Contract(_token.abi, address.address, { from: account });
  }

  const getContractData = async (contract, farm) => {
    return {
      contract: contract,
      balance: await balanceOf(contract),
      left: await balanceOf(contract, farm._address),
      totalSupply: await contract.methods.totalSupply().call(),
      name: await contract.methods.name().call(),
      symbol: await contract.methods.symbol().call(),
    }
  }

  useEffect(() => {
    if (!account) return;

    init().catch(console.error);
    async function init() {
      const [chicken, eur, farm, cow, goat] = await Promise.all([
        initContract(ChickenToken),
        initContract(EurToken),
        initContract(Farm),
        initContract(CowToken),
        initContract(GoatToken),
      ]);

      setChicken(await getContractData(chicken, farm));
      setEur(await getContractData(eur, farm));
      setCow(await getContractData(cow, farm));
      setGoat(await getContractData(goat, farm));
      setFarm({
        contract: farm,
        balance: {
          CHICKEN: await getStakingBalance(farm, 'CHICKEN'),
          COW: await getStakingBalance(farm, 'COW'),
          GOAT: await getStakingBalance(farm, 'GOAT')
        }
      });

      setIsLoading(false);
      setNeedUpdate(false);
    }
  }, [account, needUpdate]);


  const onStakeClick = (amount, currency) => {
    amount = parseInt(amount);
    if (isNaN(amount)) return alert("Value is not a number");
    if (amount <= 0) return alert("Value should be greater than 0");

    currency = currency.toUpperCase();

    farm.contract.methods.stakeTokens(amount, currency).send({ from: account }).on('transactionHash', (hash) => {
      setNeedUpdate(true);
    })
  };

  const onUnstakeClick = (amount, currency) => {
    amount = parseInt(amount);
    if (isNaN(amount)) return alert("Value is not a number");
    if (amount <= 0) return alert("Value should be greater than 0");

    currency = currency.toUpperCase();

    farm.contract.methods.unstakeTokens(amount, currency).send({ from: account }).on('transactionHash', (hash) => {
      setNeedUpdate(true);
    })
  };

  const onSellClick = (amount, currency) => {
    amount = parseInt(amount);
    if (isNaN(amount)) return alert("Value is not a number");
    if (amount <= 0) return alert("Value should be greater than 0");

    currency = currency.toUpperCase();
    farm.contract.methods.sellTokens(amount, currency).send({ from: account }).on('transactionHash', (hash) => {
      setNeedUpdate(true);
    })
  }

  const onIssueTokensClick = (currency) => {
    currency = currency.toUpperCase();
    farm.contract.methods.issueTokens(currency).send({ from: account }).on('transactionHash', (hash) => {
      setNeedUpdate(true);
    })
  }

  const depositEur = async (amount) => {
    const owner = await eur.contract.methods.owner().call();
    eur.contract.methods.transferFrom(owner, account, amount).send().on('transactionHash', (hash) => {
      setNeedUpdate(true);
    })
  }

  if (isLoading) {
    return <div className="main"><h1>loading...</h1></div>
  }

  return (
    <div className="main">
      <div style={{ position: "absolute", left: "20px" }}>
        <Button title="deposit 100€ to account" size="small" onClick={() => depositEur(100)} />
      </div>
      <Header account={account} balance={eur.balance} />
      <Dialog
        onStakeClick={onStakeClick}
        onUnstakeClick={onUnstakeClick}
        onSellClick={onSellClick}
      />
      <Table items={[chicken, cow, goat]} farmBalance={farm.balance} />
      <Footer items={[chicken, cow, goat]}
        onIssueTokensClick={onIssueTokensClick}
      />
    </div>
  )
}

export default App;
