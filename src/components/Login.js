import React from 'react';
import HomeDashboard from './HomeDashboard';
import App from './App';
import { hashHistory } from 'react-router';
import AppActions from '../actions/AppActions';
import AuthService from '../utils/AuthService';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.lock = new Auth0Lock('879T6QmvcY1giFlYveEx2LM0Qygom43T', 'mmckeaveney.eu.auth0.com');
    }

    componentWillMount() {
        // Sets up all ajax calls to send the JSON Web Token
        AuthService.setupAjax();
        // Show the login widget
        this.lock.show({
            socialBigButtons: true,
            icon: "https://www.linode.com/media/images/common/longview_icon.png",
            dict: {
                signin: {
                    title: "Welcome to JVM Real Time Metrics System. Please Sign in.",
                }
            }
        }, (err, profile, token) => {
            if (err) {
                console.log("There was an error :/", err);
                return;
            }
            // Sign in with the user and set the JSON Web Token in LocalStorage
            console.log("New Sign In with profile : ", profile);
            localStorage.setItem('userToken', token);
            localStorage.setItem('userProfile', JSON.stringify(profile));
            AppActions.updateCurrentUser(profile);
            hashHistory.push("/");
        });

    }

    render() {
            return (
                <div></div>
            );
        }
    }

export default Login;
