import React from 'react'
import {Link} from "react-router-dom"
import LoginForm from "../components/LoginForm"
const Login = () => {
    return (
        <>
            <LoginForm />
            <p className="loginText">Don't have an account? <Link to="/signup">Sign Up Here</Link></p>
        </>
    )
}

export default Login
