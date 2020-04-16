import React from 'react';
import { Route, Router } from 'react-router-dom'

import client from './components/Client'
import navbar from './components/Navbar'
class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Route path="/" exact component={client}></Route>

                <Route path="/navbar" exact component={navbar}></Route>
              
            </div>
        );
    }
}

export default App;