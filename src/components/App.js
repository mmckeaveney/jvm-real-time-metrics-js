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
import Login from './Login';
import $ from 'jquery';
import { hashHistory } from 'react-router'
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AuthService from '../utils/AuthService';
import AlertNotificationDialog from './AlertNotificationDialog';
import AppActions from '../actions/AppActions';
import UserStore from '../stores/UserStore';
import NavTabs from './NavTabs';
import UserAvatarWidget from './UserAvatarWidget';

// CSS
require('../styles/main.scss');

// Component for the main Container Div of the application.
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        AuthService.setupAjax();
        // Update user profile information on page refresh to maintain user id
        AppActions.updateCurrentUser(localStorage.getItem("userProfile"));
    }

    render() {
        AuthService.setupAjax();
        var styles = {
            appBar: {
                flexWrap: 'wrap'
            }
        };

        if (localStorage.getItem("userToken")) {
            return (
                <div className="container-fluid">
                    <AppBar
                        title={<span>JVM Real Time Metrics System</span>}
                        iconElementRight={<UserAvatarWidget/>}
                        style={styles.appBar}
                    />
                    <NavTabs/>
                    {this.props.children}
                    <AlertNotificationDialog/>
                </div>
            );
        } else {
            return (<Login/>);
        }
    }
}


export default App;

