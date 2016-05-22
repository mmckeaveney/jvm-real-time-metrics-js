import React from 'react';
import { Router, Link, hashHistory } from 'react-router';
import FontIcon from 'material-ui/lib/font-icon';
import AppBar from 'material-ui/lib/app-bar';
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
import NavTabs from './NavTabs';
import UserAvatarWidget from './UserAvatarWidget';
import LeftNav from 'material-ui/lib/left-nav';
import Home from 'material-ui/lib/svg-icons/action/home';
import Poll from 'material-ui/lib/svg-icons/social/poll';
import Notifications from 'material-ui/lib/svg-icons/social/notifications';
import Settings from 'material-ui/lib/svg-icons/action/settings';
import customBaseTheme from '../themes/customTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import SnackBars from './SnackBars';

// CSS
require('../styles/main.scss');

const customMuiTheme = getMuiTheme(customBaseTheme);
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
                <MuiThemeProvider muiTheme={customMuiTheme}>
                <div className="container-fluid">
                    <AppBar
                        title={
                        <div>
                            JVM Real Time Metrics System {" "}
                            <FontIcon className="material-icons" color="white">poll</FontIcon>
                            <FontIcon className="material-icons" color="white">trending_up</FontIcon>
                            <FontIcon className="material-icons" color="white">cloud</FontIcon>
                        </div>
                        }
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
                    <SnackBars/>
                </div>
                </MuiThemeProvider>
            );
        } else {
            return (<Login/>);
        }
    }
}


export default App;

