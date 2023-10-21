import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PushAPI } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import options from './Options';
import chain from './Chains.json';
import goerli from './goerli.json'; // Import the JSON file

const DollarPage = () => {
  const { param1 } = useParams(); // Access the parameters

  const [groupInfo, setGroupInfo] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // State for selected values
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedFromToken, setSelectedFromToken] = useState('');
  const [selectedToToken, setSelectedToToken] = useState('');
  const [selectedChain, setSelectedChain] = useState('');

  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          'https://goerli.blockpi.network/v1/rpc/public' // Goerli Provider
        );

        // Initialize PushAPI
        const signer = new ethers.Wallet('0xe3edd0ce1878ccd40178fb8897f7feab407582c0d0ee34be1e32a5cab485ce43', provider); // Replace with your private key
        const userAlice = await PushAPI.initialize(signer, { env: 'staging' });

        const info = await userAlice.chat.group.info(param1);

        setGroupInfo(info);
      } catch (error) {
        console.error('Error fetching group info:', error);
      }
    };

    fetchGroupInfo();
  }, [param1]);

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleFormSubmit = () => {
    // Perform actions with the selected values, e.g., send a transaction.
    // You can access the selected values from the state variables: selectedWallet, selectedFromToken, selectedToToken, selectedChain.
    // Implement your logic here.
  };

  return (
    <div className='flex justify-center items-center h-screen bg-orange-200/60'>
      {groupInfo ? (
        <div className=' justify-center items-center w-96'>
          <select value={selectedWallet} onChange={(e) => setSelectedWallet(e.target.value)}
          className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded focus:outline-none m-8">
              <option value="">Select Wallet from group</option>
              {groupInfo.members.map((member, index) => (
                <option key={index} value={member.wallet.substring(7)}>
                  {member.wallet.substring(7)}
                </option>
              ))}
            </select>
            <select value={selectedFromToken} onChange={(e) => setSelectedFromToken(e.target.value)}
            className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded focus:outline-none m-8">
              <option value="">Select From Token</option>
              {Object.keys(goerli).map((tokenName, index) => (
                <option key={index} value={goerli[tokenName].contractAddress}>
                  {goerli[tokenName].name}
                </option>
              ))}
            </select>
            <select value={selectedToToken} onChange={(e) => setSelectedToToken(e.target.value)}
            className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded focus:outline-none m-8">
                {Object.keys(goerli).map((tokenName, index) => (
                <option key={index} value={goerli[tokenName].contractAddress}>
                  {goerli[tokenName].name}
                </option>
              ))}
            </select>
            <select value={selectedChain} onChange={(e) => setSelectedChain(e.target.value)}
            className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded focus:outline-none m-8">
              <option value="">Select Chain</option>
              {chain.chains.map((chain, index) => (
                <option key={index} value={chain}>
                  {chain}
                </option>
              ))}
            </select>
            <button type="submit" onClick={handleFormSubmit}
            className="bg-blue-500/30 hover-bg-blue-600 text-white py-2 px-4 rounded focus:outline-none m-8">
              Submit
            </button>
        </div>
      ) : (
        <p>Loading group info...</p>
      )}
    </div>
  );
};

export default DollarPage;
