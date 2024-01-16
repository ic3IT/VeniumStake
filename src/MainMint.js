import { useState, useEffect, useMemo } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Flex, Button, Input, Text, MenuButton } from "@chakra-ui/react";
import scrolliumPass from "./ScrolliumPass.json";
import sc from "./assets/social-media-icons/ssc.gif";
import detectEthereumProvider from "@metamask/detect-provider";
import {
  useContractRead,
  useContract,
  useContractWrite,
  useAddress,
  ThirdwebProvider,
  ChainId,
  useDisconnect,
  useCoinbaseWallet,
  useWalletConnect,
  useNFTDrop,
  EditionDrop,
  useTotalCirculatingSupply,
  useTotalCount,
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

import {
  useClaimedNFTSupply,
  useContractMetadata,
  useUnclaimedNFTSupply,
  useActiveClaimCondition,
  useClaimNFT,
  useBalance,
  MediaRenderer,
  useNetworkMismatch,
  useNetwork,
  useClaimIneligibilityReasons,
} from "@thirdweb-dev/react";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";
import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains";

const contractAddress = "0xFbBce08d3395314C70EC7696AEb9A1882C893632";

const MaintMint = ({ accounts, setAccounts }) => {
  const { contract } = useContract(contractAddress);

  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithMetamask = useMetamask();

  const address = useAddress();
  const disconnect = useDisconnect();
  const { data: stock } = useContractRead(contract, "totalMinted");
  // const { mutateAsync: claim } = useContractWrite(contract, "claim");
  const d = 65;

  const { contract: editionDrop } = useContract(contractAddress);
  const tokenId = 0;
  
  const {
    data: totalCirculatingSupply,
    isLoading,
    error,
  } = useTotalCirculatingSupply(contract);
  const { data: count } = useTotalCount(contract);

  const { data: contractMetadata } = useContractMetadata(contract);
  const x = d;
  const mint = async () => {
    try {
        // Your transaction call
        await contract.erc721.claim(1);
        toast.success("Mint Successful");
    } catch (error) {
        console.error("Error encountered:", error);

        // Check for the specific pattern in the error message
        if (error.message.includes('Transaction reverted without a reason string')) {
            toast.error("Insuffienct Funds for Mint");
        } else {
            // Handle other errors
            toast.error("An unexpected error occurred.");
        }
    }
};





  const desiredNetwork = {
    chainId: "0x82750",
    chainName: "Scroll",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.scroll.io"],
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

  function CountdownTimer({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                // seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
          <Text as="span" fontSize="13px" key={interval}>
              {timeLeft[interval]} {interval}{" "}
          </Text>
        );
    });

    return (
        <div>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
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
      <Flex justify="center" h="70vh" pt="20px">
        {/* Left Box with Button Outside */}
        <Box 
          position="relative"
          w="38%" 
          h="70%" 
          p="4" 
          border="1px solid white"
          boxShadow="md" 
          m="2"
          color="white"
        >
          <Button position="absolute" top="-25px" left="-3px">
            Stake
          </Button>
          <Text>Owned</Text>
          {/* Other contents of the left box */}
        </Box>

        {/* Right Box with Button Outside */}
        <Box 
          position="relative"
          w="38%" 
          h="70%" 
          p="4" 
          border="1px solid white"
          boxShadow="md" 
          m="2"
          color="white"
        >
          <Button position="absolute" top="-25px" right="-3px">
           Withdraw
          </Button>
          <Text>Staked</Text>
          {/* Other contents of the right box */}
        </Box>
      </Flex>
    </Box>
);
};

export default MaintMint;
