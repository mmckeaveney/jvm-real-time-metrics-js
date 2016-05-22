import alt from '../alt'
import React from 'react';
import Actions from '../actions/AppActions';
import { decorate, bind } from 'alt/utils/decorators'
import _ from 'underscore';

@decorate(alt)
class SnackBarStore {

    constructor() {
        this.state = {
            open : false,
            msg: "somemsg"
        }
    }

    @bind(Actions.closeSnackbar)
    closeSnackBar() {
        this.setState({
            open: false,
            msg: 'somemsg'
        });
    }

    @bind(Actions.openSnackbar)
    openSnackbar(message) {
        this.setState({
            open: true,
            msg: message
        });
    }
}

export default alt.createStore(SnackBarStore);