import alt from '../alt';
import $ from 'jquery';

class AppActions {

    constructor() {
        this.generateActions('updateLatestApplicationMetadata');
    }

}

export default alt.createActions(AppActions);