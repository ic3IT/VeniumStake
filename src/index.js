import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThirdwebProvider, useContract } from '@thirdweb-dev/react';
import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThirdwebProvider 
    activeChain={{
      // === Required information for connecting to the network === \\
      chainId: 534352, // Chain ID of the network
      // Array of RPC URLs to use
      rpc: ["https://rpc.scroll.io"],

      // === Information for adding the network to your wallet (how it will appear for first time users) === \\
      // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
      nativeCurrency: {
        decimals: 18,
        name: "ETH",
        symbol: "ETH",
      },
      shortName: "Scroll", // Display value shown in the wallet UI
      slug: "Scroll", // Display value shown in the wallet UI
      testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
      chain: "Scroll", // Name of the network
      name: "Scroll", // Name of the network
    }}
    clientId='1febfb6f16a97c2f8206e5293a8958f1'> 
    <App />
    </ThirdwebProvider>
  </React.StrictMode>
  
);

function Component() {
  const { contract, isLoading } = useContract("0x971AB58ddfb3bdbFf21bBa6D3e9F8a43AC232891");
}