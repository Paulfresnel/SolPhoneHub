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

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    

    useEffect(()=>{
        console.log("serv url:", serverUrl)
        const fetchNfts = async ( ) =>{
            setIsLoading(true);
            const response = await Axios.get(`${serverUrl}/api/nft`);
            const nftsArray = response.data.nft;
            let filteredArray = nftsArray.filter((x) => {
                if (x.symbol === "sagapunks" || x.symbol === "sagamonkes" || x.symbol === "saga_dawgs" ||
                 x.symbol === "saga_rpg"  || x.symbol === "sagasharkyclub" || x.symbol === "slimesofsaga"
                 || x.symbol === "saga_aliens" || x.symbol === "saga_cats" || x.symbol === "sentients" 
                 || x.symbol === "sagagoatclub" || x.symbol === "saga_aliens" || x.symbol === "porkmarket_2_9"
                 || x.symbol === "baby_lonfo" || x.symbol === "belzebu"  ){
                    return x;
                }
            })
            
            let completeNftsArr = filteredArray.map(async (nft)=>{
                try{
                let response = await Axios.get(`${serverUrl}/api/nft/${nft.symbol}`);
                nft.floorPrice = response.data.nftData.floorPrice;
                return nft;
            } catch (err){
                console.log("Error has occured", err)
            }
            })
            const updatedNftsArr = await Promise.all(completeNftsArr);
            await setAirdroppedNftsData(updatedNftsArr);
            setIsLoading(false);
        }       
        fetchNfts();
        }, [])

    

    

    return(
        <div > <Text className="info-text">Here below you can find a list of different NFT projects that either airdroped to Saga Genesis holders or allowed free WL/Mint, 
        this list is not exhaustive and is subject to constant additions for the Saga Fam... 🙊</Text>

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
                                {nft.twitter && <a rel="noreferrer" target="_blank" href={nft.twitter}><i className="fa-brands fa-twitter"></i></a>}
                                {nft.discord && <a rel="noreferrer" target="_blank" href={nft.discord}><i className="fa-brands fa-discord"></i></a>}
                                {nft.website && <a rel="noreferrer" target="_blank" href={nft.website}><i className="fa-solid fa-globe"></i></a>}
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                )
            })}</div>
        
         : <div className="centered-loading"><strong>L.O.A.D.I.N.G...</strong><MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#DC1FFF"
  secondaryColor="#03E1FF"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>}

        </div>
    )
}

export default NftAirdropsCalculator;