import React, { useEffect, useState } from 'react';
import './Button.css';
import dollar from './assets/dollar.png';
import packet from './assets/packet.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@pushprotocol/uiweb';

const MyButton = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const navigate = useNavigate();

  const goToDollarPage = () => {
    // Define the parameters you want to pass
    const param1 = '51bf3a48ef9bc315401e7ac8cbd686562459aa30dbf6a90de6976ccd76c4c56b';

    // Navigate to the DollarPage with the parameters
    navigate(`/dollar/${param1}`);
  };

  const goToPacketPage = () => {
    // Define the parameters you want to pass
    const param1 = input1;
    const param2 = input2;

    // Navigate to the PacketPage with the parameters
    navigate(`/packet/${param1}/${param2}`);
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      <button className="button1 fixed top-40 right-0 m-4" onClick={goToDollarPage}>
        <img
          src={dollar} alt="back1"
          className="icon"
        />
      </button>
      <button className="redp fixed top-64 right-0 m-4 "
        onMouseEnter={handleDropdownToggle}
      >
        <img
          src={packet} alt="redp"
          className="icon"
        />
      </button>

      {isDropdownVisible && (
        <div className="bg-white p-2 shadow-md rounded w-fit z-10 fixed top-72 right-28">
          <input
            type="text"
            placeholder="Matic"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="No.of. packets"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <button className=' bg-slate-400 rounded px-4' onClick={goToPacketPage}>Create</button>
        </div>
      )}
    </div>
  );
};

export default MyButton;
