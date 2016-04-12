import React from 'react';
import { Router, Link } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { hashHistory } from 'react-router'
import UserStore from '../stores/UserStore';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AuthService from '../utils/AuthService';
import Avatar from 'material-ui/lib/avatar';
import connectToStores from 'alt/utils/connectToStores';

// CSS
require('../styles/main.scss');

@connectToStores
class UserAvatarWidget extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    static getStores(props) {
        return [UserStore];
    }

    static getPropsFromStores(props) {
        return UserStore.getState();
    }

    render() {
        const userIconMenu = (
            <IconMenu
                iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Sign out" onClick={AuthService.logOut}/>
            </IconMenu>
        );

        var currentUser;
        if (this.props.user) {
            currentUser = (
                <div>
                    <Avatar src={this.props.user.picture}/> {this.props.user.nickname}
                    {userIconMenu}
                </div>
            );
        } else {
            currentUser = (
                <div>
                    Profile Loading..
                    {userIconMenu}
                </div>
            );
        }

        return currentUser;
    }
}


export default UserAvatarWidget;
