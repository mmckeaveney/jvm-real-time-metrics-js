import React from 'react';
import HomeDashboard from './HomeDashboard';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.lock.show();
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
