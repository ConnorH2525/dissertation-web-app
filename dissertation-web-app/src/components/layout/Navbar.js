import React from 'react'
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"

const TopNavbar = () => {
    return (
    <Navbar bg="light" expand="sn">
            <Navbar.Brand as={Link} to ="/">
                Picture Frame App
            </Navbar.Brand>
                <SignedInLinks />
                <SignedOutLinks />
        </Navbar>
    )
}

export default TopNavbar
