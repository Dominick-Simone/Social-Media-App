import React from 'react'
import {Link} from "react-router-dom"
import Auth from "../utils/auth";
const Header = () => {
    return (
        <header>
            <ul>
                {Auth.loggedIn() ? (
                <>
                    <Link className="linkStyles" to="/"><li className="navigationStyles">Home</li></Link>
                    <Link className="linkStyles" to={`/${Auth.getProfile().data.username}`}><li className="navigationStyles">Dashboard</li></Link>
                    <Link className="linkStyles" to="/discover"><li className="navigationStyles">Discover</li></Link>
                    <Link className="linkStyles" to="/" onClick={() => Auth.logout()}><li className="navigationStyles"> Logout</li></Link>
                </>
                ) : (
                <>
                    <Link className="linkStyles" to="/discover"><li className="navigationStyles">Discover</li></Link>
                    <Link className="linkStyles" to="/login"><li className="navigationStyles">Login</li></Link>
                </>

                )

                }
                
            </ul>
        </header>
    )
}

export default Header
