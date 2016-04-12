import alt from '../alt'
import React from 'react';
import Actions from '../actions/AppActions';
import { decorate, bind } from 'alt/utils/decorators'
import _ from 'underscore';

@decorate(alt)
class UserStore {

    constructor() {
        this.state = {
            user : null
        }
    }

    @bind(Actions.updateCurrentUser)
    updateCurrentUser(user) {
        this.setState({
           user: user
        });
    }

}

export default alt.createStore(UserStore);
