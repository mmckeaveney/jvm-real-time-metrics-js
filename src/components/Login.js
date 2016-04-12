import React from 'react';
import HomeDashboard from './HomeDashboard';
import App from './App';
import { hashHistory } from 'react-router';
import AppActions from '../actions/AppActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.lock = new Auth0Lock('879T6QmvcY1giFlYveEx2LM0Qygom43T', 'mmckeaveney.eu.auth0.com');
    }

    componentWillMount() {
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
            console.log("New Sign In with profile : ", profile);
            localStorage.setItem('userToken', token);
            localStorage.setItem('userProfile', JSON.stringify(profile));
            AppActions.updateCurrentUser(profile);
            hashHistory.push("/");
        });

        //this.lock.once('close', function() {
        //    hashHistory.push("/"); // redirect to home on close
        //});
    }

    render() {
            return (
                <div></div>
            );
        }
    }

export default Login;
