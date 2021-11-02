import React from 'react'

const Header = () => {
    return (
        <header>
            <ul>
                <a className="linkStyles" href="#Home"><li className="navigationStyles">Home</li></a>
                <a className="linkStyles" href="#Profile"><li className="navigationStyles">Login</li></a>
                <a className="linkStyles" href="#Login"><li className="navigationStyles"> Logout</li></a>
            </ul>
        </header>
    )
}

export default Header
