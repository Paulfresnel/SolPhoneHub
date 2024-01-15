import "./Footer.css";
import { Divider, Text, Image } from "@chakra-ui/react";

function Footer(){

    return(
        <div>
        <Divider marginTop={"35px"} marginBottom={"35px"}/>
        <div className="flex-center"><Text>NFT Data powered by</Text> <a href="https://magiceden.io/"><Image className="border-r" boxSize={"30px"} src="../../Magic-Eden-logo.webp"></Image></a> </div>
        <br/>
        <div className="flex-center"><Text>Tokens Data powered by</Text> <a href="https://coingecko.com/"><Image className="border-r" boxSize={"30px"} src="../../CoinGecko_logo.png"></Image></a> </div>
        <br/>
            <p>Made with ❤️ by <a className="link" href="https://twitter.com/getmoustachu">GetMoustache</a></p>
            <p>Feel free to support the work if you enjoyed it by tipping this <a className="link" href="https://solscan.io/account/BLqeB36yXsJUs9jWB8FWKYsBr5f8CFfnhtWR6NmPJVMG">address</a>
            <br/> Or by helping improve this <a className="link" href="https://github.com/Paulfresnel/SolPhoneHub">open-source</a> website
            
            </p>
        </div>
    )
}

export default Footer;