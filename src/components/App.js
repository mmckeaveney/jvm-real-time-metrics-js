import React from 'react';
import { Router, Link, hashHistory } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import AppBar from 'material-ui/lib/app-bar';
import CircularProgress from 'material-ui/lib/circular-progress';
import IconButton from 'material-ui/lib/icon-button';
import Cancel from 'material-ui/lib/svg-icons/navigation/cancel';
import Avatar from 'material-ui/lib/avatar';
import Login from './Login';
import $ from 'jquery';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AuthService from '../utils/AuthService';
import AlertNotificationDialog from './AlertNotificationDialog';
import AppActions from '../actions/AppActions';
import UserStore from '../stores/UserStore';
import NavTabs from './NavTabs';
import UserAvatarWidget from './UserAvatarWidget';
import LeftNav from 'material-ui/lib/left-nav';
import Home from 'material-ui/lib/svg-icons/action/home';
import Poll from 'material-ui/lib/svg-icons/social/poll';
import Notifications from 'material-ui/lib/svg-icons/social/notifications';
import Settings from 'material-ui/lib/svg-icons/action/settings';
import connectToStores from 'alt/utils/connectToStores';

// CSS
require('../styles/main.scss');


// Component for the main Container Div of the application.
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            navOpen: false
        }
    }

    componentWillMount() {
        AuthService.setupAjax();

    }

    handleToggle = () => this.setState({navOpen: !this.state.navOpen});

    transition(route) {
        hashHistory.push(route);
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
                        onLeftIconButtonTouchTap={this.handleToggle.bind(this, this.props)}
                    />
                    <NavTabs/>
                    {this.props.children}
                    <AlertNotificationDialog/>
                    <LeftNav
                        docked={false}
                        width={200}
                        open={this.state.navOpen}
                        onRequestChange={(navOpen) => this.setState({navOpen})}
                    >
                        <MenuItem primaryText="Home" leftIcon={<Home/>} linkButton containerElement={<Link to="/" />}/>
                        <MenuItem primaryText="Environment" leftIcon={<Poll/>} linkButton containerElement={<Link to="/environment" />}/>
                        <MenuItem primaryText="Alerts" leftIcon={<Notifications/>}  linkButton containerElement={<Link to="/alerts" />}/>
                        <MenuItem primaryText="Settings" leftIcon={<Settings/>} linkButton containerElement={<Link to="/settings" />}/>
                    </LeftNav>
                </div>
            );
        } else {
            return (<Login/>);
        }
    }
}


export default App;

