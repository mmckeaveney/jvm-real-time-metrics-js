import alt from '../alt'
import React from 'react';
import Actions from '../actions/AppActions';
import { decorate, bind } from 'alt/utils/decorators'
import _ from 'underscore';

// Stores article headings and listens for changes.
@decorate(alt)
class ArticlesStore {

    constructor() {
    }

}

export default alt.createStore(ArticlesStore, 'ArticlesStore');
