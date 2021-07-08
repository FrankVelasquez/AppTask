import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';      
import App2 from './App';
import signin from './core/signin';
import signup from './core/signup';
import exit from './core/exit';
import PageNotFound from './core/PageNotFound';


const Routes = () => {
    return (
        <Router>
            <Switch>

                <Route exact path="/" component={App2}/>
                <Route  path="/signin" component={signin}/>
                <Route  path="/signup" component={signup}/>
                <Route path="/exit/:id" component={exit}/>
                <Route path="*" component={PageNotFound}/>
            </Switch>
        </Router>
    );
}

export default Routes;