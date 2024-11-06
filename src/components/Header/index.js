import './header.css'
import { Link } from 'react-router-dom';
import Search from '../Search';

function Header(){
    return(
        <header>
            <Link className='logo' to='/'>Henrique Flix</Link>
            <Search/>
            <Link className='favoritos' to='/favoritos'>Meus filmes</Link>
        </header>
    )
}

export default Header;
