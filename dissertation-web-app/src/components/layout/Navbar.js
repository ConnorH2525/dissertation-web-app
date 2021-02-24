import React from 'react'
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"

const TopNavbar = () => {
    const { currentUser } = useAuth()
    const links = currentUser ? <SignedInLinks /> : <SignedOutLinks />

    return (
    <Navbar bg="light" expand="sn">
            <Navbar.Brand as={Link} to ="/">
                Picture Frame App
            </Navbar.Brand>
                {links}
        </Navbar>
    )
}

export default TopNavbar
