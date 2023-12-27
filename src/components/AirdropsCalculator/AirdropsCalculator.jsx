import Axios from "axios"
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';
import "./AirdropsCalculator.css";
import { Divider, AbsoluteCenter, Box } from '@chakra-ui/react';
import {MutatingDots} from "react-loader-spinner"

function AirdropsCalculator(){

    const [tokensData, setTokensData] = useState([]);
    const [bonkValue, setBonkValue] = useState();
    const [acsValue, setAcsValue] = useState();
    const [numOfPhones, setNumOfPhones] = useState(1);
    const [multiplePhonesDisplay, setMultiplePhonesDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneCostValue, setPhoneCostValue] = useState(700);


    let fetchPrices = async () =>{
        if (bonkValue>0 && acsValue>0 && tokensData.length>0){
            alert("Prices already fetched, please wait before re-fetching the prices")
            
        }
        else{
        setIsLoading(true);
        setTokensData([]);
        setBonkValue(0);
        setAcsValue(0);
        let AccessProtocolData = await Axios.get('https://api.coingecko.com/api/v3/coins/access-protocol');
        let BonkData = await Axios.get('https://api.coingecko.com/api/v3/coins/bonk');
        let tokensDataa = [AccessProtocolData, BonkData];
        setBonkValue(BonkData.data.market_data.current_price.usd);
        setAcsValue(AccessProtocolData.data.market_data.current_price.usd);
        console.log(tokensDataa);
        await setTokensData(tokensDataa);
        console.log("what");
        console.log(tokensData);
        setTimeout(()=>{
            setIsLoading(false)
        }, 1000)
    }
    }

    let setPhonesState = (e) =>{
        setMultiplePhonesDisplay(!multiplePhonesDisplay)
     }
    

    useEffect(()=>{
        
    }, [])

    return(
        <div>
            <h1>SOLANA PHONE AIRDROP ESTIMATOOR TOOL</h1>
            <p>Play around with this Cost & Profit estimatoor 🤑 to estimate your current <strong>PnL</strong> on your Solana Phone 🤪
            <br/>
            Don't forget there's still many more news incoming... 👀</p>
            <Button className="button-margin-t" onClick={(e)=> fetchPrices(e)}>Fetch calculations...</Button>
            {!isLoading ? <div>{(bonkValue && acsValue) && <div>
                <Box position='relative' padding='10'>
                <Divider />
                    <AbsoluteCenter fontWeight={"bold"} bg='white' px='4'>
                        Current Airdrop Estimatoor
                    </AbsoluteCenter>
            </Box>
                <p className="bolder"><strong><em>Bonk</em></strong>: $ {(bonkValue*30000000*numOfPhones).toFixed(2)} </p>
                <p className="bolder"><strong><em>ACS</em></strong>: $ {(acsValue*100000*numOfPhones).toFixed(2)}</p>
                <div className="flex-collumn">
                <p className="highlighted" onClick={(e)=>setPhonesState(!multiplePhonesDisplay)}>Have multiple phones?</p>
                {multiplePhonesDisplay && 
                <label>How many ?<input type="number" className="reduced" onChange={(e)=>setNumOfPhones(e.target.value)} ></input></label>}
                <Divider className="margin-top"/>
                <label>Cost of your Phone(s): $ <input onChange={(e)=>setPhoneCostValue(e.target.value)} type="number" className="reduced-2"></input></label>
                <p>Profit: $ {((bonkValue*30000000*numOfPhones)+(acsValue*100000*numOfPhones) - phoneCostValue).toFixed(2)}</p>
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
            {!isLoading ? <div>
            <Box position='relative' padding='10'>
              <Divider />
              <AbsoluteCenter fontWeight={"bold"} bg='white' px='4'>
              Airdropped Tokens current Price
              </AbsoluteCenter>
            </Box>
            {tokensData.length>0 && <div className="centered-airdrop">{tokensData.map((token) => {
                return (
                    <div key={token.data.symbol} className="flex-row">
                    <img className="small-logo" src={token.data.image.thumb}/>
                    <p>{token.data.symbol.toUpperCase()}</p>
                    <p>$ {token.data.market_data.current_price.usd}</p>
                    {token.data.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 
                        <Badge colorScheme="green">{token.data.market_data.price_change_percentage_1h_in_currency.usd} %</Badge>
                    :
                     <Badge colorScheme="red">{token.data.market_data.price_change_percentage_1h_in_currency.usd} %</Badge>}
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
        </div>
    )
}

export default AirdropsCalculator