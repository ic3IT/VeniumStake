import{ useState } from 'react';
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';
import { useContractRead, useContract, ThirdwebProvider } from "@thirdweb-dev/react";

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <html lang="en" className='dark'>
    <div className="overlay">
    <div className="App">
  
  <div className="App scrollable-container">
    <NavBar accounts={accounts} setAccounts={setAccounts} />
    <div><br></br></div>
    <div><br></br></div>
    <MainMint accounts={accounts} setAccounts={setAccounts} />
</div>
<div className="moving-background"> </div>

</div>

  </div>
  </html>);
  
}


export default App;
