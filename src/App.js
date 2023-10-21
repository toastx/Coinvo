
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatUi from "./ChatUi";
import DollarPage from './SendCrypto';
import SendPacket from './SendPacket';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ChatUi />} />
      <Route path="/dollar/:param1" element={<DollarPage />} />
      <Route path="/packet/:param1/:param2" element={<SendPacket />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
