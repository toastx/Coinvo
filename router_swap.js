import { ethers } from "ethers";
import { useState } from "react";
import axios from "axios";

function router_swap() {
  const [walletAddress, setWalletAddress] = useState("");
  const [connected, setConnected] = useState(false);
  const [sourceToken, setSourceToken] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [destinationChain, setDestinationChain] = useState("optionA");
  const [destinationToken, setDestinationToken] = useState("optionX");
  const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api";
  const STATS_API_URL = "https://api.pf.testnet.routerprotocol.com/api";

  const chains = {
    avalanche: 43113,
    mumbai: 80001,
    goerli: 5,
  };
  const mumbai = {
    "USDT": {
      "decimals": 12,
      "contractAddress": "0x22bAA8b6cdd31a0C5D1035d6e72043f4Ce6aF054",
    },
    "ETH": {
      "decimals": 18,
      "contractAddress": "0x3C6Bb231079c1023544265f8F26505bc5955C3df",
    },
    "ROUTE": {
      "decimals": 18,
      'contractAddress': "0x908aC4f83A93f3B7145f24f906327018c9e54B3a",
    },
    'PEPE': {
      'decimals': 12,
      'contractAddress': "0xFee7De539Dd346189A33E954c8A140df95F94B89",
    },
    'PIKAMON': {
      'decimals': 12,
      'contractAddress': "0xa78044353cB8C675E905Ce7339769872Edd8E637",
    },
    "SHIBA INU": {
      'decimals': 12,
      'contractAddress': "0x418049cA499E9B5B983c9141c341E1aA489d6E4d",
    },
    'MATIC': {
      'decimals': 18,
      'contractAddress': "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    },
  };
  const avalanche = {
    'USDT': {
      'decimals': 6,
      'contractAddress': "0xb452b513552aa0B57c4b1C9372eFEa78024e5936",
    },
    'ETH': {
      'decimals': 18,
      'contractAddress': "0xce811501ae59c3E3e539D5B4234dD606E71A312e",
    },
    'ROUTE': {
      'decimals': 18,
      'contractAddress': "0x0b903E66b3A54f0F7DaE605418D14f0339560D76",
    },
    'USDC': {
      'decimals': 6,
      'contractAddress': "0x5425890298aed601595a70ab815c96711a31bc65",
    },
    'PEPE': {
      'decimals': 18,
      'contractAddress': "0x669365a664E41c3c3f245779f98118CF23a20789",
    },
    'PIKAMON': {
      'decimals': 6,
      'contractAddress': "0x00A7318DE94e698c3683db8f78dE881de4E5d18C",
    },
    "SHIBA INU": {
      'decimals': 6,
      'contractAddress': "0xB94EC038E5cF4739bE757dF3cBd2e1De897fCA2e",
    },
  };

  const goerli = {
    'USDT': {
      'decimals': 6,
      'contractAddress': "0x2227E4764be4c858E534405019488D9E5890Ff9E",
    },
    'ETH': {
      'decimals': 18,
      'contractAddress': "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    },
    'ROUTE': {
      'decimals': 18,
      'contractAddress': "0x8725bfdCB8896d86AA0a6342A7e83c1565f62889",
    },
    'PEPE': {
      'decimals': 6,
      'contractAddress': "0x9bAA6b58bc1fAB3619f1387F27dCC18CbA5A9ca1",
    },
    'PIKAMON': {
      'decimals': 6,
      'contractAddress': "0x7085f7c56Ef19043874CA3F2eA781CDa788be5E4",
    },
    "SHIBA INU": {
      'decimals': 12,
      'contractAddress': "0xDC17183328e81b5c619D58F6B7E480AB1c2EA152",
    },
    'USDC': {
      'decimals': 6,
      'contractAddress': "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    },
  };
  let params = {
    'fromTokenAddress': "",
      'toTokenAddress': "",
      'amount': 0, // source amount
      'fromTokenChainId': "80001", // Mumbai
      'toTokenChainId': 5, 
      'widgetId': 0,
  }
  const handleFormSubmit = async(e)=>{
    params = {
      'fromTokenAddress': mumbai[sourceToken]['contractAddress'],
      'toTokenAddress': goerli[destinationToken]['contractAddress'],
      'amount': amount*mumbai[sourceToken]['decimals'], // source amount
      'fromTokenChainId': "80001", // Mumbai
      'toTokenChainId': 5, 
      'widgetId': 0,
    }
    const provider = new ethers.BrowserProvider(window.ethereum)
    const quoteData = await getQuote(params);
    const txResponse = await getTransaction(params, quoteData); 
    let signer = await provider.getSigner();
    const tx = await signer.sendTransaction(txResponse.txn.execution)
    try {
        await tx.wait();
        console.log(`Transaction mined successfully: ${tx.hash}`)
    }
    catch (error) {
        console.log(`Transaction failed with error: ${error}`)
    }

    let uri = STATS_API_URL+`/v2/status?srcTxHash=${tx.hash}`
    alert(`transaction sig: ${uri}`)
    console.log(quoteData)

  }
  const setDestChain = async (destinationChain) => {
    if (destinationChain === "mumbai") {
      return mumbai;
    } else if (destinationChain === "goerli") {
      return goerli;
    } else if (destinationChain === "avalanche") {
      return avalanche;
    }
  };

  const getQuote = async (params) => {
    const endpoint = "v2/quote";
    const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

    console.log(quoteUrl);

    try {
      const res = await axios.get(quoteUrl, { params });
      return res.data;
    } catch (e) {
      console.error(`Fetching quote data from pathfinder: ${e}`);
    }
  };
  const getTransaction = async (params, quoteData) => {
    const endpoint = "v2/transaction";
    const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

    console.log(txDataUrl);

    try {
      const res = await axios.post(txDataUrl, {
        ...quoteData,
        fromTokenAddress: params.fromTokenAddress,
        toTokenAddress: params.toTokenAddress,
        slippageTolerance: 0.5,
        senderAddress: walletAddress,
        receiverAddress: '0x104dc4c1FcA6359B9bdBf81705E34f1ba91a3958',
        widgetId:0,
      });
      return res.data;
    } catch (e) {
      console.error(`Fetching tx data from pathfinder: ${e}`);
    }
  };
  const fetchStatus = async (srcTxHash) => {
    const STATS_API_URL = "https://api.pf.testnet.routerprotocol.com/api";

    const config = {
      method: "get",
      url: STATS_API_URL + "/v2/status?srcTxHash=" + srcTxHash,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data?.transaction));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const connectWalletButton = () => (
    <button className="connectWallet" onClick={() => requestWallet()}>
      Connect Wallet
    </button>
  );
  const requestWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setWalletAddress(account);
      setConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {(!connected && connectWalletButton())} {(connected&&(
      <div>
        <h1>Red Packet Creation Form</h1>
        <form onSubmit={handleFormSubmit}>
          {/* Source Token Dropdown */}
          <label htmlFor="sourceToken">Source Token:</label>
          <select
            id="sourceToken"
            name="sourceToken"
            value={sourceToken}
            onChange={(e) => setSourceToken(e.target.value)}
          >
            {Object.keys(mumbai).map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
          <br />
          <br />

          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <br />
          <br />

          <label htmlFor="destinationChain">Destination Chain:</label>
          <select
            id="destinationChain"
            name="destinationChain"
            value={destinationChain}
            onChange={(e) => setDestinationChain(e.target.value)}
          >
            <option value="goerli">goerli</option>
            <option value="avalanche">avalanche</option>
            <option value="mumbai">mumbai</option>
          </select>
          <br />
          <br />

          <label htmlFor="destinationToken">Destination Token:</label>
          <select
            id="destinationToken"
            name="destinationToken"
            value={destinationToken}
            onChange={(e) => setDestinationToken(e.target.value)}
          >
            {Object.keys(goerli).map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
          <br />
          <br />

          <button type="submit">Create Red Packet</button>
        </form>
      </div>
      ) )}
    </div>
  );
}

export default router_swap;
