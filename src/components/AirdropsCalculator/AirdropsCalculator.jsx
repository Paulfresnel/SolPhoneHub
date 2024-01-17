import Axios from "axios"
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Badge } from '@chakra-ui/react';
import "./AirdropsCalculator.css";
import { Divider, AbsoluteCenter, Box } from '@chakra-ui/react';
import {MutatingDots} from "react-loader-spinner";
import NftAirdropsCalculator from "../NftAirdropsCalculator/NftAirdropsCalculator";

function AirdropsCalculator(){

    // Defining State Variables

    // Main Tokens Array
    const [tokensData, setTokensData] = useState([]);
    const [airdroppedNftsData, setAirdroppedNftsData] = useState([]);

    // Tokens Individual State var
    const [bonkValue, setBonkValue] = useState();
    const [acsValue, setAcsValue] = useState();
    const [samoValue, setSamoValue] = useState();
    const [bozoValue, setBozoValue] = useState();
    const [solValue, setSolValue] = useState();
    const [lfgValue, setLfgValue] = useState();

    //Config Params State var
    const [numOfPhones, setNumOfPhones] = useState(1);
    const [multiplePhonesDisplay, setMultiplePhonesDisplay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneCostValue, setPhoneCostValue] = useState(700);
    const [totalNftsValue, setTotalNftsValue] = useState(0);
    const [nftStateVisibility, setNftStateVisibility] = useState(false);
    const [fetchCounter, setFetchCounter] = useState(0);

    // Error message State var
    const [fetchErrMsg, setFetchErrMsg] = useState("");

    //Defining serverUrl from env variables

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    // Fetching Token Data individually & storing it in state variables - 5 separate API Calls

    let fetchPrices = async () =>{
        if (bonkValue>0 && acsValue>0 && tokensData.length>0){
            alert("Prices already fetched, please wait before re-fetching the prices")   
        }
        else{
            if (fetchCounter===0){
                try{
        setIsLoading(true);
        setTokensData([]);
        setBonkValue(0);
        setAcsValue(0);
        setSamoValue(0);
        setSolValue(0);
        let accessProtocolResponse = await Axios.get(`${serverUrl}/api/tokens/access-protocol`);
        let bonkResponse = await Axios.get(`${serverUrl}/api/tokens/bonk`);
        let solResponse = await Axios.get(`${serverUrl}/api/tokens/solana`);
        let samoResponse = await Axios.get(`${serverUrl}/api/tokens/samoyedcoin`);
        let bozoResponse = await Axios.get(`${serverUrl}/api/tokens/bozo-collective`);
        let lfgResponse = await Axios.get(`${serverUrl}/api/tokens/lessfngas`);

        let AccessProtocolData = accessProtocolResponse.data.tokenData;
        let BonkData = bonkResponse.data.tokenData;
        let solData = solResponse.data.tokenData;
        let samoData = samoResponse.data.tokenData;
        let bozoData = bozoResponse.data.tokenData;
        let lfgData = lfgResponse.data.tokenData;

        let tokensDataArray = [AccessProtocolData, BonkData, samoData, solData, bozoData, lfgData];
        await setBonkValue(BonkData.market_data.current_price.usd);
        await setSolValue(solData.market_data.current_price.usd);
        await setAcsValue(AccessProtocolData.market_data.current_price.usd);
        await setSamoValue(samoData.market_data.current_price.usd);
        await setBozoValue(bozoData.market_data.current_price.usd);
        await setLfgValue(lfgData.market_data.current_price.usd);
        await setTokensData(tokensDataArray);
        setFetchCounter(1);
        setTimeout(()=>{
            setIsLoading(false)
        }, 1000)
    } catch(err){
        console.log("error happened in consoled:",err);
        setFetchErrMsg("There was an error due to the rate limit of coingecko's public API, please wait and try again later!");
        setIsLoading(false);
        setTimeout(()=>{
            setFetchErrMsg('');

        }, 4500);

    }
    }
    }
    }

    // Show & Hide NFTs Panel

    const switchNftStateVisibility = (e) =>{
        e.preventDefault();
        setNftStateVisibility(!nftStateVisibility);
    }

    // Show & Hide Multiple Phone Input

    let setPhonesState = (e) =>{
        setMultiplePhonesDisplay(!multiplePhonesDisplay)
     }


     // Calculate total value of NFTs from floor price & store it in state variable

     const calculateNftsTotalValueLive =  (e) => {
        e.preventDefault();
        let totalValue = 0;
        for (let i=0; i< airdroppedNftsData.length; i++){
            totalValue += airdroppedNftsData[i].floorPrice;
        }
        let lampToSolValue = totalValue/1000000000
        setTotalNftsValue(lampToSolValue);
    } 
    

    return(
        <div>
            <h1>SOLANA SAGA AIRDROP ESTIMATOOR TOOL</h1>
            <p className="paragraph">Play around with this Cost & Profit estimatoor 🤑 to estimate your <strong>current PnL</strong> on your Solana Phone 🤪
            <br/>
            Don't forget there's still many more news incoming... 👀</p>
            <p className="smol-margin">Launch the calculations and have fun trying out the app
            with different inputs (<strong>number of phones</strong> & <strong>total cost of phones</strong>)</p>

            <Button className="button-margin-t button-check" onClick={(e)=> fetchPrices(e)}>Fetch calculations...</Button>
            {setFetchErrMsg.length>0 && <p color="red">{fetchErrMsg}</p>}
            {!isLoading ? <div>{(bonkValue && acsValue) && <div>
                <Box position='relative' padding='10'>
                <Divider />
                    <AbsoluteCenter  fontWeight={"bold"} color={"rgba(145,6,196,1)"} bg='white' px='4'>
                        Current Airdrop Estimatoor
                    </AbsoluteCenter>
            </Box>
                <p className="bolder"><strong><em>BONK</em></strong>: $ {(bonkValue*30000000*numOfPhones).toFixed(2)} </p>
                <p className="bolder"><strong><em>ACS</em></strong>: $ {(acsValue*100000*numOfPhones).toFixed(2)}</p>
                <p className="bolder"><strong><em>SAMO</em></strong>: $ {(samoValue*1250*numOfPhones).toFixed(2)}</p>
                <p className="bolder"><strong><em>BOZO</em></strong>: $ {(bozoValue*300000000*numOfPhones).toFixed(2)}</p>
                <p className="bolder"><strong><em>LFG</em></strong>: $ {(lfgValue*1000000*numOfPhones).toFixed(2)}</p>


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
                <br/>          
                <p>Total Value of Rewards: $ {((bonkValue*30000000*numOfPhones)+(acsValue*100000*numOfPhones)+(samoValue*1250*numOfPhones)+
                (totalNftsValue*solValue*numOfPhones)+(bozoValue*300000000*numOfPhones)+(lfgValue*1000000*numOfPhones)).toFixed(2)}</p>
                <label>Total cost of your Phone(s): $ <input value={phoneCostValue} onChange={(e)=>setPhoneCostValue(e.target.value)} type="number" className="reduced-2"></input></label>
                {((bonkValue*30000000*numOfPhones)+(acsValue*100000*numOfPhones)+(samoValue*1250*numOfPhones)+(totalNftsValue*solValue*numOfPhones)+
                (bozoValue*300000000*numOfPhones)+(lfgValue*1000000*numOfPhones) - phoneCostValue) > 0 ? 

                <p className="green">Profit: $ {((bonkValue*30000000*numOfPhones)+(acsValue*100000*numOfPhones)+(samoValue*1250*numOfPhones)+
                (totalNftsValue*solValue*numOfPhones)+(bozoValue*300000000*numOfPhones)+(lfgValue*1000000*numOfPhones) - phoneCostValue).toFixed(2)}</p>
                : 
                <p className="red">Profit: $ {((bonkValue*30000000*numOfPhones)+(acsValue*100000*numOfPhones)+(samoValue*1250*numOfPhones)+
                (totalNftsValue*solValue*numOfPhones)+(bozoValue*300000000*numOfPhones)+(lfgValue*1000000*numOfPhones) - phoneCostValue).toFixed(2)}</p> }
                    </div>

            </div>} </div>: 
            <div className="centered-loading"><strong>L.O.A.D.I.N.G...</strong><MutatingDots
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
            {!isLoading && <div>
            {tokensData.length>0 && <Box position='relative' padding='10'>
              <Divider />
              <AbsoluteCenter color={"rgba(145,6,196,1)"} fontWeight={"bold"} bg='white' px='4'>
              Airdropped Tokens current Price
              </AbsoluteCenter>
            </Box>}
            {tokensData.length>0 && <div className="centered-airdrop">{tokensData.map((token) => {
                return (
                    <div key={token.symbol} className="flex-row">
                   <img alt={token.symbol} className="small-logo" src={token.image?.thumb}/>
                    <p>$ {token.market_data.current_price.usd}</p>
                    {token.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 
                        <Badge className="badge-m" colorScheme="green">{token.market_data.price_change_percentage_1h_in_currency.usd} %</Badge>
                    :
                     <Badge className="badge-m" colorScheme="red">{token.market_data.price_change_percentage_1h_in_currency.usd} %</Badge>}
                    </div>
                )
            })}
            </div>}
        </div>}
  
  <Box position='relative' padding='10'>
  <Divider/>
              <AbsoluteCenter color={"rgba(145,6,196,1)"} fontWeight={"bold"} bg='white' px='4'>
              Latest updates (15/01):
              </AbsoluteCenter>
              </Box>
            <ul className="latest-updates">
                <li>📱 <strong>Added Airdropped NFT collections and market data</strong> for some Saga mints </li>
                <li>📱 Backend server built to handle API requests (API powered by <a className="link-social" href="https://docs.magiceden.io/reference/get_collections">MagicEden</a> & <a href="https://www.coingecko.com/" target="_blank">Coingecko</a>)</li>
            </ul>
        </div>
    )
}

export default AirdropsCalculator