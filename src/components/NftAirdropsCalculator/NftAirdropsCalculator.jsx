import Axios from "axios";
import { ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card, Divider, Text, Heading, Stack, CardBody, CardFooter } from '@chakra-ui/react';
import { Image } from "@chakra-ui/react";
import { MutatingDots } from "react-loader-spinner";
import "./NftAirdropsCalculator.css"

function NftAirdropsCalculator(props){

    const { airdroppedNftsData, setAirdroppedNftsData, solValue} = props;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const fetchNfts = async ( ) =>{
            setIsLoading(true);
            const nftListing = await Axios.get('https://api-mainnet.magiceden.dev/v2/collections');
            const nftsArray = nftListing.data;
            let filteredArray = nftsArray.filter((x) =>{
                if (x.symbol === "sagapunks" || x.symbol === "sagamonkes" || x.symbol === "sagasharkyclub"){
                    return x;
                }
            })
            
            let completeNftsArr = filteredArray.map(async (nft)=>{
                let marketData = await Axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${nft.symbol}/stats`);
                nft.floorPrice = marketData.data.floorPrice;
                return nft;
            })
            const updatedNftsArr = await Promise.all(completeNftsArr);
            await setAirdroppedNftsData(updatedNftsArr);
            setIsLoading(false);
        }       
        fetchNfts();
        }, [])

    

    

    return(
        <div>

        {(!isLoading && airdroppedNftsData.length>0) ? 
            <div className="nfts-alligned">{airdroppedNftsData.map((nft)=>{
                return (
                    <Card className="main-card" key={nft.symbol} maxW="sm">
                        <CardBody>
                            <Image borderRadius={"lg"} src={nft.image}/>
                            <Stack mt="6" spacing="3">
                                <Heading size="md">{nft.name}</Heading>
                                    <Text>{nft.description}</Text>
                                    <Text>Current FP: {nft.floorPrice/1000000000} SOL </Text>
                                    {solValue && <Text>Current FP: $ {((nft.floorPrice/1000000000)*solValue).toFixed(2)} </Text>}
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter >
                            <ButtonGroup spacing={"50"} >
                                <a rel="noreferrer" target="_blank" href={nft.twitter}><i class="fa-brands fa-twitter"></i></a>
                                <a rel="noreferrer" target="_blank" href={nft.discord}><i class="fa-brands fa-discord"></i></a>
                                <a rel="noreferrer" target="_blank" href={nft.website}><i class="fa-solid fa-globe"></i></a>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                )
            })}</div>
        
         : <p>Loading...</p>}

        </div>
    )
}

export default NftAirdropsCalculator;