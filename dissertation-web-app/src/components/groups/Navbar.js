import React from 'react'
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function TopNavbar() {
    return (
        <Navbar bg="light" expand="sn">
            <Navbar.Brand as={Link} to ="/">
                Picture Frame App
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to ="/user">
                    Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
