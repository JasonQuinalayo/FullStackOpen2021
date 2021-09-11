import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  return (
    <>
      {user && 
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                blogs
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                users
              </Nav.Link>
            </Nav>
            <Navbar.Text>
              {`${user.name} logged in`}     
            </Navbar.Text>
            <Button variant="primary" size="sm" onClick={() => dispatch(logout())}>logout</Button>
          </Navbar.Collapse>
        </Navbar>
      }   
    </>
  )
}

export default NavBar
