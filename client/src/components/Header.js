import React from 'react'

const Header = () => {
    return (
        <header>
            <ul>
                <a className="linkStyles" href="/"><li className="navigationStyles">Home</li></a>
                <a className="linkStyles" href="/login"><li className="navigationStyles">Login</li></a>
                <a className="linkStyles" href="/profile"><li className="navigationStyles"> Logout</li></a>
            </ul>
        </header>
    )
}

export default Header
