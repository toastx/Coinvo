import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SendPacket = () => {
  const { param1, param2 } = useParams(); // Access the parameters

  console.log(param1, param2);

  const [Sent, setSent] = useState(false);

  return (
    // Your DollarPage content
    <div>
        {
          Sent ? (<p>Loading group info...</p>) : (
            <p>sending...</p>
          )
        }
    </div>
  );
};

export default SendPacket;