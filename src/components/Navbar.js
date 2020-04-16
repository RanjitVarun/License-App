import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           

        };
    }
   
    render() {
        return (

            <div >
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Client</Nav.Link>
                            <Nav.Link href="#link">Service</Nav.Link>
                            <Nav.Link href="#link"></Nav.Link>
                            
                        </Nav>
                       
                    </Navbar.Collapse>
                </Navbar>

            </div>



        )

    }
}



export default Navigation;


