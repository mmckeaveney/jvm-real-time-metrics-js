import React from 'react';
import { Router, Link } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import Login from './Login';

// CSS
require('../styles/main.scss');

// Component for the main Container Div of the application.
@ThemeDecorator(ThemeManager.getMuiTheme(DarkTheme))
class App extends React.Component {
    constructor(props) {
        super(props);
        injectTapEventPlugin();
    }

    componentWillMount() {
        this.lock = new Auth0Lock('879T6QmvcY1giFlYveEx2LM0Qygom43T', 'mmckeaveney.eu.auth0.com');
        this.setState({
            idToken: this.getIdToken()
        });
        this.setupAjax();
    }

    setupAjax() {
        $.ajaxSetup({
            'beforeSend': function (xhr) {
                if (localStorage.getItem('userToken')) {
                    xhr.setRequestHeader('Authorization',
                        'Bearer ' + localStorage.getItem('userToken'));
                }
            }
        })
    }

    getIdToken() {
        var idToken = localStorage.getItem('userToken');
        var authHash = this.lock.parseHash(window.location.hash);
        if (!idToken && authHash) {
            if (authHash.id_token) {
                idToken = authHash.id_token
                localStorage.setItem('userToken', authHash.id_token);
            }
            if (authHash.error) {
                console.log("Error signing in", authHash);
                return null;
            }
        }
        return idToken;
    }

    logOut() {
        localStorage.removeItem("userToken");
        window.location = "/";
    }

    render() {
        var myTabs = (
            <Tabs>
                <Tab label={<Link to="/">HOME</Link>}/>
                <Tab label={<Link to="/environment">ENVIRONMENT</Link>}/>
                <Tab label={<Link to="/alerts">ALERTS</Link>}/>
                <Tab label={<Link to="/settings">SETTINGS</Link>}/>
                <Tab label={
                <span className="glyphicon glyphicon-user" aria-hidden="true">
                 <RaisedButton label="Logout" secondary={true} onClick={this.logOut}/>
                 </span>}
                />
            </Tabs>
        );

        if (this.state.idToken) {
            return (
                <div className="container-fluid">
                    <AppBar
                        title={<span>JVM Real Time Metrics System</span>}
                        iconElementRight={myTabs}
                    />
                    {this.props.children}
                </div>
            );
        } else {
            return (<Login lock={this.lock} idToken={this.state.idToken} />);
        }
    }
}

export default App;

