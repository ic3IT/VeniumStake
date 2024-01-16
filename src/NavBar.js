import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer, Show, Hide, Fade } from '@chakra-ui/react';
import Discord from "./assets/social-media-icons/discord.gif";
import Twitter from "./assets/social-media-icons/twitter.gif";
import sc from "./assets/social-media-icons/sc.gif";
import { useState } from 'react';
import { useContractRead, useContract, useContractWrite, useAddress, ThirdwebProvider, ChainId, useDisconnect } from "@thirdweb-dev/react";


const NavBar = ({ accounts, setAccounts }) => {
    const address = useAddress();
    const disconnect = useDisconnect();


    const [showStake, setShowStake] = useState(false);

  const handleClick = () => {
    setShowStake(true);
  };


    return (

        <Flex justify="space-between" align="center" padding="5px">

            {/*Left Side - Social Media Icons*/}
            <Flex justify="space-around" width="40%" padding="0px">
                <Link href="https://www.venium.io/" target="_blank" rel="noopener noreferrer">
                    <Image src={sc} boxSize="70px" margin="0 15px" />
                </Link>
            </Flex>


            {/*Right Side - Sections and Connect*/}
            <Flex justify="space-between" align="center" padding="0">
                <Flex justify="space-around" width="40%" padding="75px">

                    <Spacer />
                    <Link href="https://twitter.com/venium_io" target="_blank" rel="noopener noreferrer">
                        <Image src={Twitter} boxSize="50px" margin="0 15px" />
                    </Link>
                    <Spacer />
                    <Link href="https://discord.gg/9jHynHVx" target="_blank" rel="noopener noreferrer">
                        <Image src={Discord} boxSize="50px" margin="0 15px" />
                    </Link>
                    <Spacer />
                        <Box
                            height="50px"
                            width="150px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="white"
                            margin="0px 0px"
                            cursor="pointer"
                            borderColor="#FFFFFF"
                            role="button"
                            transition="0.3s"
                            padding="20px 20px"
                            textDecoration="underline"
                            sx={{
                                position: 'relative',
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '1px',
                                    bottom: 0,
                                    left: 0,
                                    bg: 'black',
                                }
                            }}
                        >
                            Stake
                        </Box>


                    {address ? (
                        <Box
                            onClick={disconnect}
                            boxSize="50px"
                            margin="15px 15px 0 15px"
                            cursor="pointer"
                            _hover={{ bg: "gray.200" }}
                            role="button"
                            transition="0.3s"
                        >
                            Disconnect
                        </Box>
                    ) : null}

                </Flex>


            </Flex>

        </Flex>


    );
};

export default NavBar;