import { Button, Image, AbsoluteCenter, Divider, Box } from "@chakra-ui/react";
import Axios from "axios"
import { useEffect, useState } from "react";
import "./SagaDaoAccnt.css"
import { MutatingDots } from "react-loader-spinner";


function SagaDaoAccnt (){

    const [solBalance, setSolBalance] = useState(0);
    /* const [txSign, setTxSign] = useState([]); */
    const [solData, setSolData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    //Defining serverUrl from env variables

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    

    useEffect(()=>{

        setIsLoading(true);

        const fetchBalanceData = async () =>{
            const response = await Axios.get(`${serverUrl}/api/sagadao`);
            const balance = (response.data.balance)/1000000000;
            setSolBalance(balance);
        }

        const fetchSolMktData = async () => {
            const response = await Axios.get(`${serverUrl}/api/tokens/solana`);
            const solReturnData = response.data.tokenData;
            setSolData(solReturnData);
        }

        fetchBalanceData();
        fetchSolMktData();
        setTimeout(()=>{
            setIsLoading(false);
        }, 1000)


    }, [])

    return(
        <div>
        <p className="centered-text">Find information on the SagaDAO Treasury funds</p>
        <p className="centered-text">This wallet is mainly funded through the inflows of the royalties of the different NFT projects that allocated a % share to the sagaDAO Fam</p>
        
        {(!isLoading && solData?.image) ? <div><Box position='relative' padding='10'>
                <Divider />
                    <AbsoluteCenter  fontWeight={"bold"} color={"rgba(145,6,196,1)"} bg='white' px='4'>
                        SagaDAO Treasury
                    </AbsoluteCenter>
            </Box>
         <div className="margin-t sagadao">SOL Balance: {solBalance.toFixed(2)} <Image className="margin-left" src={solData.image.thumb}/> </div>
         <div className="margin-t sagadao margin-b">SOL Balance (in USD): $ {Number(solBalance*solData.market_data.current_price.usd).toLocaleString()}</div>
         <Divider/>
         <div className="margin-t sagadao">SOL current Price: $ {solData.market_data.current_price.usd.toFixed(2)}</div>
</div>: <div className="centered-loading"><strong>L.O.A.D.I.N.G...</strong><MutatingDots
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


export default SagaDaoAccnt;