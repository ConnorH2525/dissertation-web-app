import React from 'react'
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const SignedOutLinks = () => {
    return (
        <>
        <Nav>
            <Nav.Link as={Link} to ="/login">
                Login
            </Nav.Link>
        </Nav>
        <Nav>
            <Nav.Link as={Link} to ="/signup">
                Signup
            </Nav.Link>
        </Nav>  
        </>
    )
}

export default SignedOutLinks