import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import { useState } from "react";

function App() {

const [walletAddress, setWalletAddress] = useState("");
const [connected, setConnected] = useState(false);
const [total, settotal] = useState("");
const [amount, setAmount] = useState("");

const handleFormSubmit = (e) => {
  e.preventDefault();
  createRedPacket(total, amount);
  console.log("Sender Name:", total);
  console.log("Amount:", amount);
};

const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "random_number",
        type: "uint256",
      },
    ],
    name: "RandomNumberGenerated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RedPacketClaimed",
    type: "event",
  },
  {
    inputs: [],
    name: "claimRandomisedRedPacket",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "createRandomisedRedPackets",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "numPackets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "randMod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "redPackets",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "claimed",
        type: "bool",
      },
    ],
  },
];
const contractAddress = "0x2F53ce236a8ae269D12039a8Dc51B60630D7C113";

async function createRedPacket(total, num) {
  if (window.ethereum) {
    let provider = new ethers.BrowserProvider(window.ethereum);

    let signer = await provider.getSigner();
    const redPacketContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const transaction = await redPacketContract.createRandomisedRedPackets(
      total,
      num,
      { value: ethers.parseEther(total.toString()) }
    );
    console.log(transaction.hash);
    alert("Creating Red Packet.....");

    const result = await transaction.wait();
    console.log(result);
    if (result != "undefined") {
      alert("Red Packet Created");
    }
  } else {
    console.error("Metamask is not installed in the browser");
  }
}

async function claimRandomisedRedPacket() {
  if (window.ethereum) {
    let provider = new ethers.BrowserProvider(window.ethereum);
    let signer = await provider.getSigner();

    const redPacketContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    try {
      const transaction = await redPacketContract.createRandomisedRedPackets();
      console.log(transaction.hash);
      const result = await transaction.wait();
      console.log(result);
    } catch (err) {
      alert("Claimed");
      console.log("Error is: ", err);
    }
  } else {
    console.error("Metamask is not installed in the browser");
  }
}
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
      {!connected && connectWalletButton()}
      {connected && (
        <div>
          <h1>Create Red Packet</h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="total">total:</label>
            <input
              type="text"
              id="total"
              name="total"
              required
              value={total}
              onChange={(e) => settotal(e.target.value)}
            />
            <br />
            <br />

            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <br />
            <br />

            <button type="submit">Create Red Packet</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
