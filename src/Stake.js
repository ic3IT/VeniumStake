import React from "react";
import { Box, Flex, Button, Text, MenuButton, Menu, MenuList, MenuItem } from "@chakra-ui/react";
import { useContract, useAddress } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-hot-toast";

// Icons and additional imports
import { MetamaskLogo, WalletConnectLogo, CoinbaseLogo } from "./assets/icons";

const stakeAddress = "0x3cB01292c85065E34a8fE3efADDD5530A1DBC973";
const nftAddress = "0xC5047644e26AAC3075faE25Bf042E540d23c1025";

const Stake = () => {
  const { contract: stakingContract } = useContract(stakeAddress);
  const address = useAddress();

  // Replace with actual staking logic
  const stakeNft = async (nftId) => {
    // Staking logic goes here
  };

  // Replace with actual unstaking logic
  const unstakeNft = async (nftId) => {
    // Unstaking logic goes here
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="30px" paddingTop='60px'>
      <ToastContainer position="top-center" />
      <Box width="1200px">
        <Flex direction="column" align="center">
          <Text fontSize="60px" textShadow="0 5px #000000">Scrollium Stake</Text>
          <Flex justify="space-between" width="100%">
            {/* Owned NFTs Box */}
            <Box width="511.491px" height="635.151px" border="2px solid" borderColor="gray.200" p="4">
              {/* List owned NFTs here */}
            </Box>

            {/* Staked NFTs Box */}
            <Box width="511.491px" height="635.151px" border="2px solid" borderColor="gray.200" p="4">
              {/* List staked NFTs here */}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Stake;
