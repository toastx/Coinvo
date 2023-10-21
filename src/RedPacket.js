import React from "react"
import './sendpacket.css'
import img from './assets/redpacket.png'
import back1 from './assets/back1.png'
import back2 from './assets/back2.jpg'

const RedPacket = () => {

    const backgroundStyle = {
        backgroundImage: `url(${back2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        position: 'fixed',
      };

    return ( 
        <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden bg-red-300/10">
            
            <div>
            <img 
            src={back1} alt="back1"
            className=" absolute left-0"
            />
            </div>

            <div className="redpacket mb-8">
            <img 
            src={img} alt="redpacket"
            className="img max-h-96"
            />
            </div>

            <div className="button pb-32">
            <button className="button2 text-center flex items-center">
                <div className="text relative left-4 font-mono font-bold">Receive Packet</div>
            </button>
            </div>
        
        </div>
    );
}
 
export default RedPacket;