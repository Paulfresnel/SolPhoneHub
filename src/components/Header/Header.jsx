import './Header.css';
import { Link } from 'react-router-dom';

function Header(){

    return(
        <div className="centered background">
        <Link to="/"><img alt="Solana Phone Updates Logo" class="logo" src="./solana_phone_logo.jpeg"></img></Link>
            <div className='menu-link'><Link to="/updates">Latest Updates</Link></div>
            <div className='menu-link'><Link to="/airdrops">Airdrop Values</Link></div>
        </div>
    )
}

export default Header