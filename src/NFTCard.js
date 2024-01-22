import {
    ThirdwebNftMedia,
    useContract,
    useContractRead,
    useNFT,
    Web3Button,
    useAddress,
  } from "@thirdweb-dev/react";
  import { Box, Flex, Button, Input, Text, MenuButton, Image } from "@chakra-ui/react";
  import styles from "./styles/styles.css"
  import card from "./assets/social-media-icons/output-onlinegiftools.gif";
  
  const NFTCard = ({ tokenId }) => {
    const nftAddress = "0xFbBce08d3395314C70EC7696AEb9A1882C893632";
    const stakeAddress = "0x224D2b36b79BE59dBA3F98B4fEE92a9035EfbdB8";
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
            <Image src={card} height="320px" width="320px" />
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
  