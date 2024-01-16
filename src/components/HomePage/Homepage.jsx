import { Image, Box } from '@chakra-ui/react'
import "./Homepage.css";
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


function Homepage(){
    
    return(
        <div>
        <h1 className='main-title'>The unofficial Solana Phone Hub to stay updated on the latest drops and news  </h1>
            <div className='hp-center'>
                    <div className="flex-r">
                        <div ><Box className='smol-img' boxSize='sm'><Image borderRadius={"30px"} src="./downloadedImage.png"/></Box></div>
                        <div>
                    <p className='paragraph'>This unnoficial site serves as a base to centralize the information and news going on about the Solana Saga Mobile Phones in a way
                    help the community in an open-source way.
                <br/>
                Feel free to contact me if you'd like to contribute to the development of this site 
                </p>
                </div>
                
                </div>
                
            </div>        
            <div className="organized-cards">
            
            <Card align="center"  className='card'>
                <CardHeader>
                    <Heading className='solana-text'>Airdrops Value Estimatoor</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Estimate the value of the Airdrops associated with the ownership of a Solana Saga phone</Text>
                </CardBody>
                <CardFooter>
                    <Link to="/airdrops"><Button className='button-check'>Check</Button></Link>
                </CardFooter>
            </Card>
            
            <Card align="center" className='card'>
                <CardHeader>
                    <Heading className='solana-text'>Stay Updated</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Stay up-to-date with the latest news and updates happening on the space for the Solana Saga Phone</Text>
                </CardBody>
                <CardFooter>
                    <Link to="/updates"><Button className='button-check'>Check</Button></Link>
                </CardFooter>
            </Card>
            
            <Card align="center"  className='card'>
                <CardHeader>
                    <Heading className='solana-text'>Official Links</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Make sure to follow the official Links from the Solana Mobile Team</Text>
                </CardBody>
                <CardFooter>
                    <a target='_blank' rel="noreferrer" href="https://twitter.com/solanamobile"><Button className='button-check'>Check</Button></a>
                </CardFooter>
            </Card>
            </div>
        </div>
    )
}

export default Homepage