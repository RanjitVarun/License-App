import React from 'react';
import axios from 'axios'
import { FormControl, FormGroup, Button, Col, Container,Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from 'react-loader'


class Client extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName:'',
           clientList:[],
           loaded:false

        };
    }
    componentDidMount() {

        axios.get(`/api/Clients`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientList: persons ,loaded:true});
            })
       

    }

    changeHandler = (e) => {
       
        this.setState({ [e.target.name]: e.target.value }
          );


    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.clientName)
        const user = {
            companyName: this.state.clientName
        }
        axios.post(`/api/Clients`,  user )
            .then(res => {
                console.log(res)
            });
        confirmAlert({

            message: 'Entry added successfully',
            buttons: [
                {
                    label: 'Proceed',
                    onClick: () => this.renderListagain()
                }]
        });
        this.setState({ clientName:'' })
    }


    deleteClient = (e) => {
        console.log(e);
        confirmAlert({
 
            message: 'Are you sure to delete this entry',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/api/Clients/` + e).then(res =>
                     this.setState({ loaded: false }, this.renderListagain())   
                    )
                },
                {
                    label: 'No',
                    onClick: () => console.log('No')
                }
            ]
        });
    }


    renderListagain = () => {
       
       
        axios.get(`/api/Clients`)
            .then(res => {
                const persons = res.data;
                this.setState({ clientList: persons, loaded:true });
            })
    }

    renderClientList = () => {
        return this.state.clientList.map((result) => {
            return (

                <tr key={result.clientID}>
                    <td>{result.clientID}</td>
                    <td>{result.companyName}</td>
                    <td><Button onClick={() => this.deleteClient(result.clientID)}>Delete</Button>&nbsp;</td>
                </tr>

            )
        })
    }



    render() {
        return (
            
                <div >
                <Loader loaded={this.state.loaded} />
                <Container fluid >
                    <Row>
                        <Col>
                            <form onSubmit={this.handleFormSubmit}>

                                <FormGroup>
                                    <h5>Client Name</h5>
                                    <FormControl
                                        type="text"
                                        name='clientName'
                                        onChange={this.changeHandler}
                                        value={this.state.clientName}
                                        placeholder="Enter client Name" />
                                    <FormControl.Feedback />
                                </FormGroup>  
                                <Button type="submit"> ADD</Button>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Client List</h5>
                            <Table responsive hover size="sm">
                                <thead>
                                    <tr key={this.state.temp}>
                                        <th>Client ID</th>
                                        <th>Company Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderClientList()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                    
                </div>
                
        

        )

    }
}



export default Client;


       