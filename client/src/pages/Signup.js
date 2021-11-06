import React from 'react'
import { Link } from "react-router-dom"
import SignupForm from '../components/SignupForm'
const Signup = () => {
    return (
        <>
            <SignupForm />
            <p className="signUpText">Already have an account? <Link to="/login">Login Here</Link></p>
        </>
    )
}

export default Signup
