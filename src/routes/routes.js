import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from '../components/App.js';
import HomeDashboard from '../components/HomeDashboard';
import EnvironmentDashboard from '../components/EnvironmentDashboard';
import AlertsDashboard from '../components/AlertsDashboard';
import ClientAppDrilldown from '../components/ClientAppDrilldown';
import Login from '../components/Login';
import Settings from '../components/Settings';

let routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <IndexRoute component={HomeDashboard} />
            <Route path="/environment" component={EnvironmentDashboard}/>
            // TODO: This is a routing hack, fix it
            <Route path="/appdetail/frankblizzard/:image" component={ClientAppDrilldown}/>
            <Route path="/alerts" component={AlertsDashboard}/>
            <Route path="/settings" component={Settings}/>
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('app-container'));
