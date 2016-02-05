import React from 'react';
import HomeDashboard from './HomeDashboard';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.lock.show({
            socialBigButtons: true,
            icon: "https://www.linode.com/media/images/common/longview_icon.png",
            dict: {
                signin: {
                    title: "Welcome to JVM Real Time Metrics System. Please Sign in.",
                }
            }
        });

    }

    render() {
        if (this.props.idToken) {
            return (
                <HomeDashboard/>
            );
        } else {
            return (<div>LOGIN FAILED</div>);
        }
    }
}

export default Login;
