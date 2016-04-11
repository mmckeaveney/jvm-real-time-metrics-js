import alt from '../alt';
import $ from 'jquery';
import _ from 'underscore';

class AppActions {

    constructor() {
        this.generateActions('updateLatestEvents');
        this.generateActions('saveAlert');
        this.generateActions('updateLatestAlerts');
        this.generateActions('updateTriggeredAlert');
        this.generateActions('deleteAlert');
        this.generateActions('resetAlert');
        this.generateActions('updateLatestApplicationMetadata');
    }

    fetchLatestAlerts() {
        var self = this;
        $.ajax({
            dataType: "json",
            url: "http://localhost:8090/api/alerts/all",
            success: (alerts) => {
                self.actions.updateLatestAlerts(alerts);
            },
            error: (error) => {
                console.log("Error retrieving alerts", error)
            }
        });
    }

}

export default alt.createActions(AppActions);