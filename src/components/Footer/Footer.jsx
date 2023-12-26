import "./Footer.css";
import { Divider } from "@chakra-ui/react";

function Footer(){

    return(
        <div>
        <Divider margin={"25px"}/>
            <p>Made with ❤️ by <a className="link" href="https://twitter.com/getmoustachu">GetMoustache</a></p>
            <p>Feel free to support the work if you enjoyed it by tipping this <a className="link" href="https://solscan.io/account/BLqeB36yXsJUs9jWB8FWKYsBr5f8CFfnhtWR6NmPJVMG">address</a>
            <br/> Or by helping improve this open-source website
            
            </p>
        </div>
    )
}

export default Footer