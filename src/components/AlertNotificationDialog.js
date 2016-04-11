import React from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import WebSocket from '../utils/WebSocket';
import { browserHistory } from 'react-router'
import AppActions from '../actions/AppActions';

class AlertNotificationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            appName: null,
            metric: null,
            condition: null,
            criteria: null
        };
    }

    componentDidMount() {
        WebSocket.register([{
            route: '/jvmrt/alertnotification', callback: this.show
        }], "/alertnotification");
    }

    show = (alert) => {
        console.log("alert triggered");
        var incomingAlert = JSON.parse(alert.body);
        AppActions.updateTriggeredAlert(alert.body);
        this.setState({
            open: true,
            appName: incomingAlert.appName,
            metric: incomingAlert.metric,
            condition: incomingAlert.condition,
            criteria: incomingAlert.criteria
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    goToAlerts = () => {
        browserHistory.push("/alerts");
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="GO TO ALERTS PAGE"
                secondary={true}
                onTouchTap={this.goToAlerts}
            />
        ];

        return (
                <Dialog
                    title={"New Alert Triggered!"}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {`An Alert you set has been triggered: \n
                     ${this.state.appName} ${this.state.metric} ${this.state.condition} ${this.state.criteria}`}
                </Dialog>
        );
    }
}

export default AlertNotificationDialog;