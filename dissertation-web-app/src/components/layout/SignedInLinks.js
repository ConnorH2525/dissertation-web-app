import React from 'react'
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const SignedInLinks = () => {
    return (
        <Nav>
            <Nav.Link as={Link} to ="/user">
                Profile
            </Nav.Link>
        </Nav>
    )
}

export default SignedInLinks