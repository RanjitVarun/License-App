import React from 'react';
import axios from 'axios'
import { FormControl, FormGroup, Button, Col, Container, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from 'react-loader'


class AppService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceName: '',
            sku:'',
            appServiceList: [],
            loaded: false

        };
    }
    componentDidMount() {

        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
             // console.log(persons)
               this.setState({ appServiceList: persons, loaded: true });
            })


    }

    changeHandler = (e) => {

        this.setState({ [e.target.name]: e.target.value }
        );


    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        const service = {
            serviceName: this.state.serviceName,
            sku:this.state.sku
        }
        axios.post(`/api/AppServices`, service)
            .then(res => {
                console.log(res)
            });
        confirmAlert({

            message: 'Entry added successfully',
            buttons: [
                {
                    label: 'Proceed',
                    onClick: () => this.setState({ loaded: false }, this.renderListagain())
                }]
        });
        this.setState({ serviceName:'',sku:'' })
    }


    deleteService = (e) => {
        console.log(e);
        
        confirmAlert({

            message: 'Are you sure to delete this entry',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/api/AppServices/`+ e).then(res =>
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


        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
                this.setState({ appServiceList: persons, loaded: true });
            })
    }

    renderServiceList = () => {
        return this.state.appServiceList.map((result) => {
            return (

                <tr key={result.appServiceID}>
                    <td>{result.appServiceID}</td>
                    <td>{result.serviceName}</td>
                    <td>{result.sku}</td>
                    <td><Button onClick={() => this.deleteService(result.appServiceID)}>Delete</Button>&nbsp;</td>
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
                                    <h5>App Service Name</h5>
                                    <FormControl
                                        type="text"
                                        name='serviceName'
                                        onChange={this.changeHandler}
                                        value={this.state.serviceName}
                                        placeholder="Enter Service Name" />
                                    <FormControl.Feedback />
                                    
                                </FormGroup>
                                <FormGroup>
                                    <h5>Sku</h5>
                                    <FormControl
                                        type="text"
                                        name='sku'
                                        onChange={this.changeHandler}
                                        value={this.state.sku}
                                        placeholder="Enter sku id" />
                                    <FormControl.Feedback />

                                </FormGroup>
                                <Button type="submit"> ADD</Button>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>App Service List</h5>
                            <Table responsive hover size="sm">
                                <thead>
                                    <tr key={this.state.temp}>
                                        <th>App Service ID</th>
                                        <th>Service Name</th>
                                        <th>SKU</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderServiceList()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>

            </div>



        )

    }
}



export default AppService;


