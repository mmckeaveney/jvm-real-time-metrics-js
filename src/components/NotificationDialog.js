import React from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import WebSocket from '../utils/WebSocket';

class NotificationDialog extends React.Component {
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
            route: '/jvmrt/alertNotification', callback: this.show
        }], "/alertnotification");
    }

    show = (alert) => {
        var incomingAlert = JSON.parse(alert.body);
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {`An Alert you set has been triggered.`}
                </Dialog>
        );
    }
}

export default NotificationDialog;