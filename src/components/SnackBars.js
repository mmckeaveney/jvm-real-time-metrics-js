import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import AppActions from '../actions/AppActions';
import SnackBarStore from '../stores/SnackBarStore';
import Snackbar from 'material-ui/lib/snackbar';

@connectToStores
class SnackBars extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    static getStores(props) {
        return [SnackBarStore];
    }

    static getPropsFromStores(props) {
        return SnackBarStore.getState();
    }

    closeSnackbar() {
        AppActions.closeSnackbar();
    }

    render() {
        return (
            <Snackbar
                open={this.props.open}
                message={this.props.msg}
                autoHideDuration={4000}
                onRequestClose={this.closeSnackbar.bind(this)}
            />
        )
    }
}


export default SnackBars;