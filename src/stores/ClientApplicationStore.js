import alt from '../alt'
import React from 'react';
import Actions from '../actions/AppActions';
import { decorate, bind } from 'alt/utils/decorators'
import _ from 'underscore';

@decorate(alt)
class ClientApplicationStore {

    constructor() {
        this.state = {
            clientApplications : []
        }
    }

    @bind(Actions.updateLatestApplicationMetadata)
    updateLatestApplicationMetadata(metadata) {
       var incomingMetadata = JSON.parse(metadata.body);

           this.setState({
               clientApplications: incomingMetadata
           });
    }

}

export default alt.createStore(ClientApplicationStore);
