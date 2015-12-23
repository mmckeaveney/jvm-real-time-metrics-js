import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from '../components/App.js';
import MainDashboard from '../components/MainDashboard.js'
import EnvironmentPage from '../components/EnvironmentPage';

let routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <IndexRoute component={MainDashboard} />
        </Route>
        <Route path="/environment" component={App}>
            <IndexRoute component={EnvironmentPage} />
        </Route>
        <Route path="/world" component={App}>
            <IndexRoute component={MainDashboard} />
        </Route>
        <Route path="/politics" component={App}>
            <IndexRoute component={MainDashboard} />
        </Route>
        <Route path="/technology" component={App}>
            <IndexRoute component={MainDashboard} />
        </Route>
        <Route path="/science" component={App}>
            <IndexRoute component={MainDashboard} />
        </Route>
        <Route path="/entertainment" component={App}>
            <IndexRoute component={MainDashboard} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('main-container'));
