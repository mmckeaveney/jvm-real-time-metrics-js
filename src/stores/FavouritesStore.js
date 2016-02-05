import alt from '../alt'
import React from 'react';
import Actions from '../actions/AppActions';
import { decorate, bind } from 'alt/utils/decorators'
import _ from 'underscore';

@decorate(alt)
class FavouritesStore {

    constructor() {
        this.state = {
            favourites : []
        }
    }

    @bind(Actions.addToFavourites)
    updateLatestEvents(app) {
    }

}

export default alt.createStore(FavouritesStore);
