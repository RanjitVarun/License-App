import React from 'react';
import axios from 'axios'
import { FormControl, FormGroup, Button, Col, Container, Row } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from 'react-loader'


class ClientSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientID: '',
            serviceID: '',
            clientList: [],
            serviceList:[],
            clientSubList: [],
            loaded: false,
            clientTitle: 'select client',
            subStatus: null,
    

        };
    }
    componentDidMount() {

        axios.get(`api/ClientSubscriptions`)
            .then(res => {
                const persons = res.data;
               // console.log(persons)
                this.setState({ clientSubList: persons, loaded: true });
            })

        axios.get(`/api/Clients`)
            .then(res => {
                const persons = res.data;
               // console.log(persons)
                this.setState({ clientList: persons});
            })
        axios.get(`/api/AppServices`)
            .then(res => {
                const persons = res.data;
                // console.log(persons)
                this.setState({ serviceList: persons});
            })

    }

    changeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value }
        );
      
    }

    changeClientID = (e) => {
            this.state.clientList.map((result) => {
                if (result.companyName == e.target.value) {
                    //console.log(result.clientID)
                    this.setState({ clientID: result.clientID })
                }
                else { }
              
            }) 
    }

    changeServiceID = (e) => {
        this.state.serviceList.map((result) => {
            if (result.serviceName == e.target.value) {
              
                this.setState({ serviceID: result.appServiceID })
            }
            else { }
        }) 
    }

    changeRadio = (e) => {
      
        if (e.target.value == "Active") {
            this.setState({ subStatus: true })
        }
        else { this.setState({ subStatus:false }) }
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
       
        const subscription = {
            clientID: this.state.clientID,
            appServiceID: this.state.serviceID,
            isSubscriptionActive: this.state.subStatus
        }
        console.log(subscription)
        axios.post(`/api/ClientSubscriptions`, subscription)
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
        this.setState({
            clientID: '',
            serviceID: '', subStatus:null
        })
    }


    deleteSubscription = (e) => {
        console.log(e);

        confirmAlert({

            message: 'Are you sure to delete this entry',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios.delete(`/api/ClientSubscriptions/`+e).then(res =>
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


        axios.get(`api/ClientSubscriptions`)
            .then(res => {
                const persons = res.data;
                // console.log(persons)
                this.setState({ clientSubList: persons, loaded: true });
            })
    }

    sliceDate(date) {
        if (date == null) {

        }
        else {
            var date = date;
            var result = date.slice(0, 10);
            return result
        }
    }
    checkTrue(data) {
        if (data == true) {
            return <td style={{ color: "green" }}>active</td>
        }
        else {
            return <td style={{ color: "red" }}>Inactive</td>
        }
    }

    //checkappServiceName = (e) => {
    //    console.log(e)
    //    //console.log(this.state.serviceList)
    //   return  this.state.serviceList.map((result) => {
    //       // console.log(result.appServiceID)
    //       if (result.appServiceID == e) {
    //           return <td>{result.serviceName}</td>
    //        }
    //        else { }

    //    })
    //}


    renderClientSubList = () => {
        return this.state.clientSubList.map((result) => {
            return (

                <tr key={result.clientSubscriptionID}>
                    <td>{result.clientSubscriptionID}</td>
                    <td>{result.clientID}</td>
                    <td>{result.appServiceID}</td>
                    <td>{this.sliceDate(result.licenseExpiredDate)}</td>
                    <td>{this.sliceDate(result.licenseActivationDate)}</td>
                    {this.checkTrue(result.isSubscriptionActive)}
                    <td><Button onClick={() => this.deleteSubscription(result.clientSubscriptionID)}>Delete</Button>&nbsp;</td>
                </tr>

            )
        })
    }

    renderClientDropDown = () => {
        return this.state.clientList.map((result) => {
            return (
                
                <option key={result.clientID}>{result.companyName}</option>

            )
        })
    }

    renderServiceDropDown = () => {
        return this.state.serviceList.map((result) => {
            return (

                <option key={result.appServiceID}>{result.serviceName}</option>

            )
        })
    }

    checkfn = () => {
        console.log(this.state.subStatus)
    }
 



    render() {
        return (

            <div >
                <Loader loaded={this.state.loaded} />
                <Container fluid >
                    <Row>
                        <Col>
                            <form onSubmit={this.handleFormSubmit}>
                                <h5>Client Subscription Form</h5>
                                <FormGroup>
                                    <h5>Clients</h5>
                                    <select
                                        name='clientID'

                                        defaultValue={this.state.clientList}
                                        onChange={this.changeClientID}
                                    ><option>select client</option>
                                        
                                        {this.renderClientDropDown()}
                                    </select>
                                   
                                
                                </FormGroup>
                                <FormGroup>
                                    <h5>Services</h5>
                                    <select
                                        name='serviceID'

                                        defaultValue={this.state.serviceList}
                                        onChange={this.changeServiceID}
                                    ><option>select service</option>

                                        {this.renderServiceDropDown()}
                                    </select>
                                   
                                </FormGroup>
                                <FormGroup>
                                    <h5>Subscription Status</h5>
                                    <select
                                        value={this.state.subStatus}
                                        onChange={this.changeRadio}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Active">ACTIVE</option>
                                        <option value="Inactive">INACTIVE</option>
                                       
                                    </select>
                                   
                                </FormGroup>
                                <Button type="submit"> ADD</Button>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>Subscription List</h5>
                            <Table responsive hover size="sm">
                                <thead>
                                    <tr key={this.state.temp}>
                                        <th>ClientSubscriptionID</th>
                                        <th>ClientID</th>
                                        <th>AppServiceID</th>
                                        <th>LicenseExpiredDate</th>
                                        <th>LicenseActivationDate</th>
                                        <th>SubscriptionActive</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderClientSubList()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>

            </div>



        )

    }
}



export default ClientSubscription;


