import alt from '../alt'
import React from 'react';
import Actions from '../actions/AppActions';
import { decorate, bind } from 'alt/utils/decorators'
import _ from 'underscore';

@decorate(alt)
class EventsStore {

    constructor() {
        this.state = {
            events : []
        }
    }

    @bind(Actions.updateLatestEvents)
    updateLatestEvents(events) {
        this.setState({
            events: events
        });
    }

}

export default alt.createStore(EventsStore);
