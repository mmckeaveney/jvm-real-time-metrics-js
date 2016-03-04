import React from 'react';
import { Router, Link } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import CircularProgress from 'material-ui/lib/circular-progress';
import IconButton from 'material-ui/lib/icon-button';
import Cancel from 'material-ui/lib/svg-icons/navigation/cancel';
import Avatar from 'material-ui/lib/avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Login from './Login';
import $ from 'jquery';

// CSS
require('../styles/main.scss');

// Component for the main Container Div of the application.
@ThemeDecorator(ThemeManager.getMuiTheme(LightTheme))
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
        this.getUserProfile();
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

    getUserProfile() {
        this.lock.getProfile(localStorage.getItem('userToken'), function (err, profile) {
            if (err) {
                console.log("Error loading the Profile", err);
                return;
            }
            $.post({url: `http://localhost:8090/api/usercheck?userId=${profile.user_id}&userName=${profile.nickname}&email=${profile.email}`,
                success: (user) => {
                    this.setState({profile: profile});
                }
            });
        }.bind(this));
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
        var currentUser;
        if (this.state.profile) {
            currentUser = (
                <div>
                    <Avatar src={ this.state.profile.picture }/> { this.state.profile.nickname }
                    <IconButton onClick={this.logOut}> <Cancel/> </IconButton>
                </div>
            );
        } else {
            currentUser = (
                <span className="glyphicon glyphicon-user" aria-hidden="true"> Profile Loading..
                    <IconButton onClick={this.logOut}> <Cancel/> </IconButton>
                </span>
            );
        }
        var myTabs = (
            <Tabs>
                <Tab label={<Link to="/">HOME</Link>}/>
                <Tab label={<Link to="/environment">ENVIRONMENT</Link>}/>
                <Tab label={<Link to="/alerts">ALERTS</Link>}/>
                <Tab label={<Link to="/settings">SETTINGS</Link>}/>
                <Tab label={ currentUser }
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
            return (<Login lock={this.lock} idToken={this.state.idToken}/>);
        }
    }
}

export default App;

