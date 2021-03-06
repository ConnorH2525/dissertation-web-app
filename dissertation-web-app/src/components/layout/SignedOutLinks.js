import React from 'react'
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const SignedOutLinks = () => {
    return (
        <>
        <Nav>
            <Nav.Link as={Link} style={{color:"lightgrey"}} to ="/signup">
                Create Account
            </Nav.Link>
        </Nav>
        <Nav>
            <Nav.Link as={Link} style={{color:"lightgrey"}} to ="/login">
                Login
            </Nav.Link>
        </Nav>
        </>
    )
}

export default SignedOutLinks