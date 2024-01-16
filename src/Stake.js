import { useState, useEffect, useMemo } from "react";
import { ethers } from 'ethers'
import { Box, Flex, Button, Input, Text, MenuButton } from "@chakra-ui/react";
import scrolliumPass from "./ScrolliumPass.json";
import sc from "./assets/social-media-icons/ssc.gif";

import detectEthereumProvider from "@metamask/detect-provider";
import {
  useContractRead,
  useContract,
  useContractWrite,
  useAddress,
  useOwnedNFTs,
  useNFTBalance,
  ThirdwebProvider,
  ChainId,
  isApproved,
  useDisconnect,
  useCoinbaseWallet,
  useWalletConnect,
  useNFTDrop,
  EditionDrop,
  useTotalCirculatingSupply,
  useTotalCount,
  ThirdwebNftMedia,
  Web3Button,
} from "@thirdweb-dev/react";
import { useMetamask } from "@thirdweb-dev/react";
import MetaMaskOnboarding from "@metamask/onboarding";
import TT from "./conthrax-sb.otf";
import { Toaster, toast } from "react-hot-toast";
import {
  ChakraProvider,
  extendTheme,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  Grid,
  Divider,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
} from "@chakra-ui/react";
import { MetamaskLogo } from "./assets/icons/MetamaskLogo.tsx";
import { WalletConnectLogo } from "./assets/icons/WalletConnectLogo.tsx";
import { CoinbaseLogo } from "./assets/icons/CoinbaseLogo.tsx";

const nftAddress = "0xC5047644e26AAC3075faE25Bf042E540d23c1025";
const stakeAddress = "0x3cB01292c85065E34a8fE3efADDD5530A1DBC973";

const Stake = ({ accounts, setAccounts }) => {
  const { contract } = useContract(stakeAddress);

  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithMetamask = useMetamask();

  const address = useAddress();
  const disconnect = useDisconnect();

  const { contract: nftContract } = useContract(nftAddress);
  const { contract: stakingContract } = useContract(stakeAddress);
  const {data: stakedNFTs} = useContractRead(stakingContract, "getStakeInfo", [address]);
  // console.log(stakedNFTs)
  // const {data: Approved} = useContract(isApproved);

  const { data: ownedNFTs } = useOwnedNFTs(nftContract, address)
  const { data: ownerBalance } = useNFTBalance(nftContract, address);


  async function stakeNft(nftId) {
    if (!address) return;

    // nftId = String(nftId);

    // Use isApprovedForAll to check for operator approval
    const isApproved = await nftContract?.erc721.isApproved(address, stakeAddress);

    if (!isApproved) {
      await nftContract?.erc721.setApprovalForAll(stakeAddress, true);
    }
    // console.log(isApproved)
    // console.log(nftId)
    // nftId = `${nftId}`
    await stakingContract?.call("stake", [[nftId]]);
  }

  const desiredNetwork = {
    chainId: "0x8274f",
    chainName: "Scroll Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia-rpc.scroll.io"],
    blockExplorerUrls: ["https://scrollscan.com/"],
  };

  async function requestNetworkSwitch(provider) {
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [desiredNetwork],
      });
    } catch (switchError) {
      console.error(switchError);
      // Handle the error, maybe alert the user they need to switch manually or the network details are wrong
    }
  }

  async function withdrawFirstNft() {
    if (!address || !stakedNFTs || stakedNFTs.length === 0 || !stakedNFTs._tokensStaked || stakedNFTs._tokensStaked.length === 0) return;
  
    const firstNftId = stakedNFTs._tokensStaked[0].toNumber();
    await stakingContract?.call("withdraw", [[firstNftId]]);
  }

return (
    <Box align="center" bg="black" mt="-123px">
      {/* Box for Scrollium Pass Text */}
      <Box width="fit-content" height="auto" p="2">
        <Text fontSize="60px" textShadow="0 5px #000000">
          Scrollium Pass
        </Text>
      </Box>

      {/* Flex container for the two boxes */}
      <Flex justify="center" h="75vh" pt="108px">
        {/* Left Box with Button Outside */}
        <Box 
          position="relative"
          w="38%" 
          h="70%" 
          borderRadius="30px"
          p="4" 
          border="1px solid white"
          boxShadow="md" 
          m="2"
          color="white"
        >
          <Button 
          position="absolute"  
          height="30px"
          width="150px" 
          top="-45px" 
          left="25px"
          borderRadius="10px"
          _hover={{
            boxShadow: "0px 0px 40px 5px rgba(100, 230, 250, 0.7)",
            transform: "translateY(-2px)",
            background: "white",
            color: "teal.500",
          }}          
          >
            Stake
          </Button>
          <Text>Owned</Text>
         
        </Box>

        {/* Right Box with Button Outside */}
        <Box 
          position="relative"
          w="38%" 
          h="70%" 
          p="4" 
          border="1px solid white"
          borderRadius="30px"
          boxShadow="md" 
          m="2"
          color="white"
        >
          <Button 
          position="absolute"  
          height="30px"
          width="150px" 
          top="-45px" 
          right="25px"
          borderRadius="10px"
          _hover={{
            boxShadow: "0px 0px 40px 5px rgba(100, 230, 250, 0.7)",
            transform: "translateY(-2px)",
            background: "white",
            color: "teal.500",
          }}          
          >
           Claim
          </Button>
          <Text>Staked</Text>
          {/* Other contents of the right box */}
          <Button 
          onClick={withdrawFirstNft}
          position="absolute"  
          height="30px"
          width="150px" 
          bottom="-45px" 
          right="25px"
          borderRadius="10px"
          _hover={{
            boxShadow: "0px 0px 40px 5px rgba(100, 230, 250, 0.7)",
            transform: "translateY(-2px)",
            background: "white",
            color: "teal.500",
          }}          
          >
           Withdraw
          </Button>
        </Box>
      </Flex>
    </Box>
);
};

export default Stake;
