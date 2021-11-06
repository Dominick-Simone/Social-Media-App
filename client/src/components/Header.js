import React from 'react'
import Auth from "../utils/auth";
const Header = () => {
    return (
        <header>
            <ul>
                {Auth.loggedIn() ? (
                <>
                    <a className="linkStyles" href="/"><li className="navigationStyles">Home</li></a>
                    <a className="linkStyles" href="/" onClick={() => Auth.logout()}><li className="navigationStyles"> Logout</li></a>
                </>
                ) : (
                <>
                    <a className="linkStyles" href="/"><li className="navigationStyles">Home</li></a>
                    <a className="linkStyles" href="/login"><li className="navigationStyles">Login</li></a>
                </>

                )

                }
                
            </ul>
        </header>
    )
}

export default Header
