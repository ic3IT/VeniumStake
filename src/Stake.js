import { useState, useEffect, useMemo } from "react";
import { ethers } from 'ethers'
import { Box, Flex, Button, Input, Text, MenuButton, textDecoration } from "@chakra-ui/react";
import scrolliumPass from "./ScrolliumPass.json";
import sc from "./assets/social-media-icons/ssc.gif";
import './styles/styles.css'; // Adjust the path according to your file structure
import NFTDisplay from "./NFTDisplay.js"
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
import NFTCard from "./NFTCard.js";

const nftAddress = "0x2E07070E527321139499a8EBC2bA3bB03fa7eC0F";
const stakeAddress = "0x37027c59D999C13E2399635dA20e9f5dFDb5a3B2";

const Stake = ({ accounts, setAccounts }) => {
  const { contract } = useContract(stakeAddress);
  


  const address = useAddress();
  console.log(address)
  const disconnect = useDisconnect();

  const { contract: nftContract } = useContract(nftAddress);
  const { contract: stakingContract } = useContract(stakeAddress);
  const { data: stakedNFTs } = useContractRead(stakingContract, "getStakeInfo", [address]);
  const { data: ownedNFTs } = useOwnedNFTs(nftContract, address)


  async function stakeNft(nftId) {
    if (!address) return;

    // nftId = String(nftId);

    // Use isApprovedForAll to check for operator approval
    const isApproved = await nftContract?.erc721.isApproved(address, stakeAddress);

    if (!isApproved) {
      await nftContract?.erc721.setApprovalForAll(stakeAddress, true);
    }
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

  const [isCooldown, setIsCooldown] = useState(false);
  

const notStaking = () => {
  if (!address) {
      toast.error("Wallet Not Connected")
      return;
    }

  if (!stakedNFTs || !Array.isArray(stakedNFTs[0]) || stakedNFTs[0].length === 0) {
    toast.error("Currently Not Staking");
    return
  }
}

  const handleButtonClick = () => {
    if (isCooldown) {
      // Ignore the click if we're in cooldown
      return;
    }
    
    if (!address) {
      toast.error("Wallet Not Connected")
      return;
    }

    toast.error("You Don't Own a Pass");

    // Start cooldown
    setIsCooldown(true);

    // End cooldown after 3 seconds
    setTimeout(() => {
      setIsCooldown(false);
    }, 3000);
  };



  async function withdrawFirstNft() {
    if (!address || !stakedNFTs || stakedNFTs.length === 0 || !stakedNFTs._tokensStaked || stakedNFTs._tokensStaked.length === 0) return;

    const firstNftId = stakedNFTs._tokensStaked[0].toNumber();
    await stakingContract?.call("withdraw", [[firstNftId]]);
  }
  
  const [claimableRewards, setClaimableRewards] = useState();

      useEffect(() => {
        if (!stakingContract || !address) return;

        async function loadClaimableRewards() {
          const stakeInfo = await stakingContract?.call("getStakeInfo", [address]);
          setClaimableRewards(stakeInfo[1]);
        }

        loadClaimableRewards();
      }, [address, stakingContract]);

      // const { mutateAsync: claimRewards } = useContractWrite(
      //   stakingContract,
      //   "claimRewards"
      // );
      


  return (

    <Box align="center" bg="black" mt="-123px">
      {/* Box for Scrollium Pass Text */}
      <Box width="" height="auto" p="0">
  <Text fontSize="60px" textShadow="0 5px #000000">
    Scrollium Pass
  </Text>
  {!address ? (
    <Text fontSize="20px" textShadow="0 5px #000000" height="1px" className="bounce-animation" style={{ textDecoration: 'underline' }}>
      Connect Your Wallet
    </Text>
  ) : (
    <Flex justifyContent="center" alignItems="center"> {/* Center content horizontally */}
      <Text fontSize="20px" textShadow="0 5px #000000" mr="2">
        Rewards:
      </Text>
      <p>
        {!claimableRewards
          ? "Loading..."
          : Math.floor(Number(ethers.utils.formatUnits(claimableRewards, 18))).toString()} sVEN
      </p>
    </Flex>
  )}
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
          {
          ownedNFTs && ownedNFTs.length > 0 ? (
    ownedNFTs.map((nft) => (
      <Web3Button
        contractAddress={stakeAddress}
        action={() => stakeNft(nft.metadata.id)}
        className="web3ButtonLeft"
      >
        Stake
      </Web3Button>
    ))
  ) : (
    <Button
      className="buttonX"
      onClick={handleButtonClick}
    >
      Stake
    </Button>
  )
}


<Text>
  Owned: {ownedNFTs?.map((nft) => nft.metadata.id).join(', ')}
</Text>

          {
  ownedNFTs && ownedNFTs.length > 0 && (
    <ThirdwebNftMedia metadata={ownedNFTs[0].metadata} />
  )
}

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
          color
          ="white"
        >
          {address ? (
            <div>

            </div>
          ) : (null)}
        <Text>
  Staked: {stakedNFTs?.[0].map((stakedNFT) => 
    <NFTDisplay tokenId={stakedNFT.toNumber()} nftContract={nftContract} />
  ).reduce((prev, curr) => prev === null ? [curr] : [...prev, ', ', curr], null)}
</Text>


          <Box>
          {
  stakedNFTs && Array.isArray(stakedNFTs[0]) && stakedNFTs[0].length > 0 ? (
    <div key={stakedNFTs[0][0].toString()}>
      <NFTCard tokenId={stakedNFTs[0][0].toNumber()} />
    </div>
  ) : (
    <Button
      className="buttonY"
      onClick={notStaking}
    >
      Withdraw
    </Button>
  )
}


          </Box>

          <Box>
  {address ? (
    <Flex alignItems="center"> {/* Use Flex with horizontal alignment */}
      <Web3Button
       contractAddress={stakeAddress}
        action={(stakingContract) => stakingContract.call("claimRewards")}
        className="web3ButtonBottom"
      >
        Claim 
      </Web3Button>
    </Flex>
  ) : null}
</Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Stake;
