import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import search from '../../assets/images/search.svg';
import CategotyLink from "../categoryLink/CategoryLink";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Header = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [view, setView] = useState('');

    console.log(useAuth0(), 'auth');

    useEffect(() => {
        if (!isAuthenticated) return;

        setView( <Link className="prof" to="/profile"><img src={user.picture} alt="" /> {user.nickname}</Link> )
    }, [isAuthenticated])

    return (
        <header className="header">
            <div className="header__container container">
                <Link to="/">
                    <img src={logo} alt="News Portal" />
                </Link>
                <nav>
                    <ul>
                        <CategotyLink title="business"/>
                        <CategotyLink title="entertainment"/>
                        <CategotyLink title="health"/>
                        <CategotyLink title="science"/>
                        <CategotyLink title="sports"/>
                        <CategotyLink title="technology"/>                     
                    </ul>

                    {isAuthenticated ? view : <button onClick={() => {loginWithRedirect()}}>Sign in</button>}
                    
                    
                    <Link to="search">
                        <img src={search} alt="search" />
                    </Link>                    
                </nav>
            </div>
        </header>
    )
}

export default Header;