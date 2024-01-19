import {
    ThirdwebNftMedia,
    useContract,
    useContractRead,
    useNFT,
    Web3Button,
    useAddress,
  } from "@thirdweb-dev/react";
  import { Box, Flex, Button, Input, Text, MenuButton } from "@chakra-ui/react";
  import styles from "./styles/styles.css"
  
  const NFTCard = ({ tokenId }) => {
    const nftAddress = "0x2E07070E527321139499a8EBC2bA3bB03fa7eC0F";
    const stakeAddress = "0x37027c59D999C13E2399635dA20e9f5dFDb5a3B2";
    const address = useAddress();
    const { contract: nftContract } = useContract(nftAddress);
    const { contract: stakeContract } = useContract(stakeAddress);
    const { data: nft } = useNFT(nftContract, tokenId);
    const { data: stakedNFTs } = useContractRead(stakeContract, "getStakeInfo", [address])


  
    async function withdraw(nftId) {
        await stakeContract?.call("withdraw", [[nftId]]);
    }
  
    return (
      <>
        {nft && (
          <Flex flexDirection="column">
            <div>
            <ThirdwebNftMedia 
                metadata={nft.metadata}
                />
            </div>
            <Web3Button
            action={() => withdraw(nft.metadata.id)}
            contractAddress={stakeAddress}
            className="web3ButtonRight"
            >
            Withdraw
            </Web3Button>
            {/* <Web3Button
              contractAddress={stakeAddress}
              action={() => withdraw(nft.metadata.id)}
            >
              Withdraw
            </Web3Button> */}
          </Flex>
        )}
      </>
    );
  };
  
  export default NFTCard;
  