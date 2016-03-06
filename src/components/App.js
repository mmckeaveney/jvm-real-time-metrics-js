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
import { browserHistory } from 'react-router'
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

// CSS
require('../styles/main.scss');

// Component for the main Container Div of the application.
@ThemeDecorator(ThemeManager.getMuiTheme(LightTheme))
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
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

    handleActive(tab) {
        browserHistory.push(tab.props.route);
    }

    render() {
        var currentUser;
        if (this.state.profile) {
            currentUser = (
                <div>
                    <Avatar src={this.state.profile.picture}/> {this.state.profile.nickname}
                    <IconMenu
                        iconButtonElement={
                         <IconButton><MoreVertIcon /></IconButton>
        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Sign out" onClick={this.logOut} />
                    </IconMenu>
                </div>
            );
        } else {
            currentUser = (
                <div>
                    Profile Loading..
                    <IconMenu
                        iconButtonElement={
                         <IconButton><MoreVertIcon /></IconButton>
        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Sign out" onClick={this.logOut} />
                    </IconMenu>
                    </div>
            );
        }

        var styles = {
            appBar: {
                flexWrap: 'wrap'
            },
            tabs: {
                width: '100%'
            },
            tab: {
                marginLeft: 20
            }
        };

        var myTabs = (
            <Tabs style={styles.tabs}>
                <Tab label="HOME" route="/" onActive={this.handleActive} />
                <Tab label="ENVIRONMENT" route="/environment" onActive={this.handleActive} />
                <Tab label="ALERTS" route="/alerts" style={styles.tab} onActive={this.handleActive} />
                <Tab label="SETTINGS" route="/settings" onActive={this.handleActive} />
            </Tabs>
        );

        if (this.state.idToken) {
            return (
                <div className="container-fluid">
                    <AppBar
                        title={<span>JVM Real Time Metrics System</span>}
                        iconElementRight={currentUser}
                        style={styles.appBar}
                    />
                    {myTabs}
                    {this.props.children}
                </div>
            );
        } else {
            return (<Login lock={this.lock} idToken={this.state.idToken}/>);
        }
    }
}


export default App;

