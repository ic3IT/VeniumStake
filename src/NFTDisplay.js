import { useNFT } from "@thirdweb-dev/react";

const NFTDisplay = ({ tokenId, nftContract }) => {
    const { data: nft } = useNFT(nftContract, tokenId);
  
    return (
      <>{nft?.metadata?.id}</>
    );
};

export default NFTDisplay;
