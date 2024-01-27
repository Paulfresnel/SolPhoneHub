import { Button, Image, AbsoluteCenter, Divider, Box, Badge } from "@chakra-ui/react";
import Axios from "axios"
import { useEffect, useState } from "react";
import "./SagaDaoAccnt.css"
import { MutatingDots } from "react-loader-spinner";


function SagaDaoAccnt (){

    const [solBalance, setSolBalance] = useState(0);
    /* const [txSign, setTxSign] = useState([]); */

    // DAO Wallets State var
    const [solData, setSolData] = useState([]);
    const [sagaDaoBalance, setSagaDaoBalance] = useState(0);

    const [totalSolValue, setTotalSolValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);



    //Defining serverUrl from env variables

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    

    useEffect(()=>{

        setIsLoading(true);

        const fetchBalanceData = async () =>{
            const response = await Axios.get(`${serverUrl}/api/sagadao`);
            const balance = (response.data.balance)/1000000000;
            const sagaDaoBalance = (response.data.sagaDaoBalance)/1000000000;
            const totalSolDaoBalance = balance + sagaDaoBalance;
            setSolBalance(balance);
            setSagaDaoBalance(sagaDaoBalance);
            setTotalSolValue(totalSolDaoBalance);
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
        <p className="centered-text margin-t sagadao underlined">Find information on the SagaDAO Treasury funds</p>
        <br/>
        <p className="centered-text">The DAO is mainly built around <strong fontWeight="bold">2 wallets</strong>: </p>

        <ul>
            <li className="spaced-li"> 🔍 <strong className="bolded"><a href="https://solana.fm/address/6jYqTEtDgkr1v4DtU4QDUmg1cAf4o1GSsQDGt9X8EfPG?cluster=mainnet-alpha">Royalties Wallet</a></strong>: Mainly funded through the inflows of the royalties of the different NFT projects that allocated a % share to the sagaDAO Fam,</li>
            <li className="spaced-li"> 🔍 <strong className="bolded"><a href="https://solana.fm/address/F8jKpEssvYmpoEZSVrsQNtDFCLp8jrpxojRzLzjDkd1h?cluster=mainnet-alpha">TheSagaDao.sol Wallet</a></strong>: DAO Council multisig Wallet to handle DAO operations </li>
        </ul>  
        
        {(!isLoading && solData?.image) ? <div><Box position='relative' padding='10'>
                <Divider />
                    <AbsoluteCenter className="no-bottom-p"  fontWeight={"bold"} color={"rgba(145,6,196,1)"} bg='white' px='4'>
                        SagaDAO Treasury
                    </AbsoluteCenter>
            </Box>
            <div className="margin-t sagadao no-margin-t"><p>Total SOL Balance: {totalSolValue.toLocaleString()}</p><Image className="margin-left" src={solData.image.thumb}/></div>
            <div className="margin-t sagadao"><p>Total Balance (in USD): $ {Number(totalSolValue*solData.market_data.current_price.usd).toLocaleString()}</p></div>
            <div className="flexing-column">
                <div className="card-sagadao">
                    <h3 className="heading3"><a className="link" target="_blank" rel="noreferrer" href="https://solana.fm/address/6jYqTEtDgkr1v4DtU4QDUmg1cAf4o1GSsQDGt9X8EfPG?cluster=mainnet-alpha">Royalties Wallet</a></h3>
                    <div className="margin-t sagadao">SOL Balance: {solBalance.toFixed(2)} <Image className="margin-left" src={solData.image.thumb}/> </div>
                    <div className="margin-t sagadao margin-b">SOL Balance (in USD): $ {Number(solBalance*solData.market_data.current_price.usd).toLocaleString()}</div>
                </div>
                <div className="card-sagadao">
                    <h3 className="heading3"><a className="link" target="_blank" rel="noreferrer" href="https://solana.fm/address/F8jKpEssvYmpoEZSVrsQNtDFCLp8jrpxojRzLzjDkd1h?cluster=mainnet-alpha">TheSagaDao.sol Wallet </a> <Badge colorScheme="red">COMPROMISED</Badge></h3>
                    <div className="margin-t sagadao">SOL Balance: {sagaDaoBalance.toFixed(2)} <Image className="margin-left" src={solData.image.thumb}/> </div>
                    <div className="margin-t sagadao margin-b">SOL Balance (in USD): $ {Number(sagaDaoBalance*solData.market_data.current_price.usd).toLocaleString()}</div>
                </div>
            </div>

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