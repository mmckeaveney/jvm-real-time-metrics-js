import React from 'react';
import Snackbar from 'material-ui/lib/snackbar';

class NotificationSnackbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    show = () => {
        this.setState({
            open: true
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={this.props.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default NotificationSnackbar;