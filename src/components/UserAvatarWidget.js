import React from 'react';
import { Router, Link } from 'react-router';
import { hashHistory } from 'react-router'
import UserStore from '../stores/UserStore';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import AuthService from '../utils/AuthService';
import Avatar from 'material-ui/Avatar';
import connectToStores from 'alt/utils/connectToStores';
import AppActions from '../actions/AppActions';

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
            var profile = JSON.parse(localStorage.getItem("userProfile"));
            currentUser = (
                <div>
                    Profile Loading..
                    {userIconMenu}
                </div>
            );
            AppActions.updateCurrentUser(profile);
        }

        return currentUser;
    }
}


export default UserAvatarWidget;
