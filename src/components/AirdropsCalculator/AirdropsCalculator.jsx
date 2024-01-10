import Axios from "axios"
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Badge } from '@chakra-ui/react';
import "./AirdropsCalculator.css";
import { Divider, AbsoluteCenter, Box } from '@chakra-ui/react';
import {MutatingDots} from "react-loader-spinner";
import NftAirdropsCalculator from "../NftAirdropsCalculator/NftAirdropsCalculator";

function AirdropsCalculator(){

    const [tokensData, setTokensData] = useState([]);
    const [airdroppedNftsData, setAirdroppedNftsData] = useState([]);
    const [bonkValue, setBonkValue] = useState();
    const [acsValue, setAcsValue] = useState();
    const [samoValue, setSamoValue] = useState();
    const [solValue, setSolValue] = useState(0);
    const [numOfPhones, setNumOfPhones] = useState(1);
    const [multiplePhonesDisplay, setMultiplePhonesDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneCostValue, setPhoneCostValue] = useState(700);
    const [totalNftsValue, setTotalNftsValue] = useState(0);
    const [nftStateVisibility, setNftStateVisibility] = useState(false);


    let fetchPrices = async () =>{
        if (bonkValue>0 && acsValue>0 && tokensData.length>0){
            alert("Prices already fetched, please wait before re-fetching the prices")   
        }
        else{
        setIsLoading(true);
        setTokensData([]);
        setBonkValue(0);
        setAcsValue(0);
        setSamoValue(0);
        setSolValue(0);
        let AccessProtocolData = await Axios.get('https://api.coingecko.com/api/v3/coins/access-protocol');
        let BonkData = await Axios.get('https://api.coingecko.com/api/v3/coins/bonk');
        let solData = await Axios.get('https://api.coingecko.com/api/v3/coins/solana');
        let samoData = await Axios.get('https://api.coingecko.com/api/v3/coins/samoyedcoin');
        let tokensDataArray = [AccessProtocolData, BonkData, samoData, solData];
        await setBonkValue(BonkData.data.market_data.current_price.usd);
        await setSolValue(solData.data.market_data.current_price.usd);
        await setAcsValue(AccessProtocolData.data.market_data.current_price.usd);
        await setSamoValue(samoData.data.market_data.current_price.usd);
        await setTokensData(tokensDataArray);
        setTimeout(()=>{
            setIsLoading(false)
        }, 1000)
        
    }
    }

    const switchNftStateVisibility = (e) =>{
        e.preventDefault();
        setNftStateVisibility(!nftStateVisibility);
    }

    let setPhonesState = (e) =>{
        setMultiplePhonesDisplay(!multiplePhonesDisplay)
     }

     const calculateNftsTotalValueLive =  (e) => {
        e.preventDefault();
        let totalValue = 0;
        for (let i=0; i< airdroppedNftsData.length; i++){
            totalValue += airdroppedNftsData[i].floorPrice;
        }
        let lampToSolValue = totalValue/1000000000
        setTotalNftsValue(lampToSolValue);
    } 
    

    useEffect(()=>{
        
    }, [])

    return(
        <div>
            <h1>SOLANA PHONE AIRDROP ESTIMATOOR TOOL</h1>
            <p className="paragraph">Play around with this Cost & Profit estimatoor 🤑 to estimate your <strong>current PnL</strong> on your Solana Phone 🤪
            <br/>
            Don't forget there's still many more news incoming... 👀</p>
            <p>Launch the calculations and have fun trying out the app
            <br/>  with different inputs (<strong>number of phones</strong> & <strong>total cost of phones</strong>)</p>

            <Button className="button-margin-t button-check" onClick={(e)=> fetchPrices(e)}>Fetch calculations...</Button>
            {!isLoading ? <div>{(bonkValue && acsValue) && <div>
                <Box position='relative' padding='10'>
                <Divider />
                    <AbsoluteCenter  fontWeight={"bold"} color={"rgba(145,6,196,1)"} bg='white' px='4'>
                        Current Airdrop Estimatoor
                    </AbsoluteCenter>
            </Box>
                <p className="bolder"><strong><em>Bonk</em></strong>: $ {(bonkValue*30000000*numOfPhones).toFixed(2)} </p>
                <p className="bolder"><strong><em>ACS</em></strong>: $ {(acsValue*100000*numOfPhones).toFixed(2)}</p>
                <p className="bolder"><strong><em>Samo</em></strong>: $ {(samoValue*1250*numOfPhones).toFixed(2)}</p>
                {totalNftsValue > 0 && <p className="bolder"><strong><em>NFTs</em></strong>: $ {(totalNftsValue*solValue*numOfPhones).toFixed(2)}</p>}
                <div className="center-buttons">
                
                {nftStateVisibility ? <Button onClick={(e)=>switchNftStateVisibility(e)}>Hide Airdropped NFTs</Button>
                :                     <Button onClick={(e)=>switchNftStateVisibility(e)}>Show Airdropped NFTs</Button>
                }
                {nftStateVisibility && <div><p>Make sure to hit refresh to fetch the latest market data 
                <br/>& update the estimatoor with the NFTs value!</p><Button onClick={(e)=>calculateNftsTotalValueLive(e)}>Refresh NFTs Floor Prices</Button></div>}
                </div>


                <div className="flex-collumn">
                <p className="highlighted" onClick={(e)=>setPhonesState(!multiplePhonesDisplay)}>Have multiple phones?</p>
                {multiplePhonesDisplay && 
                <label>How many ?<input type="number" className="reduced" onChange={(e)=>setNumOfPhones(e.target.value)} ></input></label>}
                <Divider className="margin-top"/>
                <label>Total cost of your Phone(s): $ <input value={phoneCostValue} onChange={(e)=>setPhoneCostValue(e.target.value)} type="number" className="reduced-2"></input></label>
                {((bonkValue*30000000*numOfPhones)+(acsValue*100000*numOfPhones)+(samoValue*1250*numOfPhones)+(totalNftsValue*solValue*numOfPhones) - phoneCostValue) > 0 ? <p className="green">Profit: $ {((bonkValue*30000000*numOfPhones)+(acsValue*100000*numOfPhones)+(samoValue*1250*numOfPhones)+(totalNftsValue*solValue*numOfPhones) - phoneCostValue).toFixed(2)}</p>
                : <p className="red">Profit: $ {((bonkValue*30000000*numOfPhones)+(acsValue*100000*numOfPhones)+(samoValue*1250*numOfPhones)+(totalNftsValue*solValue*numOfPhones) - phoneCostValue).toFixed(2)}</p> }
                    </div>

            </div>} </div>: 
            <div className="centered"><MutatingDots
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
  {(!isLoading && tokensData.length>0) && <div>{nftStateVisibility && <NftAirdropsCalculator airdroppedNftsData={airdroppedNftsData} setAirdroppedNftsData={setAirdroppedNftsData} totalNftsValue={totalNftsValue} setTotalNftsValue={setTotalNftsValue} solValue={solValue}/>}</div>}
            {!isLoading ? <div>
            {tokensData.length>0 && <Box position='relative' padding='10'>
              <Divider />
              <AbsoluteCenter color={"rgba(145,6,196,1)"} fontWeight={"bold"} bg='white' px='4'>
              Airdropped Tokens current Price
              </AbsoluteCenter>
            </Box>}
            {tokensData.length>0 && <div className="centered-airdrop">{tokensData.map((token) => {
                return (
                    <div key={token.data.symbol} className="flex-row">
                    <img className="small-logo" src={token.data.image.thumb}/>
                    <p>$ {token.data.market_data.current_price.usd}</p>
                    {token.data.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 
                        <Badge className="badge-m" colorScheme="green">{token.data.market_data.price_change_percentage_1h_in_currency.usd} %</Badge>
                    :
                     <Badge className="badge-m" colorScheme="red">{token.data.market_data.price_change_percentage_1h_in_currency.usd} %</Badge>}
                    </div>
                )
            })}
            </div>}
        </div> : <div className="centered"><MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#03E1FF"
  secondaryColor="#DC1FFF"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>}
  <Box position='relative' padding='10'>
  <Divider/>
              <AbsoluteCenter color={"rgba(145,6,196,1)"} fontWeight={"bold"} bg='white' px='4'>
              Latest updates (10/01):
              </AbsoluteCenter>
              </Box>
            <ul className="latest-updates">
                <li>📱 <strong>Added Airdropped NFT collections and market data</strong> for Saga Monkes, SagaSharkyClub & Saga Punks </li>
                <li>📱 Added Links to the social accounts of the airdropped NFT collections (API powered by <a className="link-social" href="https://docs.magiceden.io/reference/get_collections">MagicEden</a>)</li>
            </ul>
        </div>
    )
}

export default AirdropsCalculator