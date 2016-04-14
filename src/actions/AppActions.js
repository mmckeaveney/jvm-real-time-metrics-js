import alt from '../alt';
import $ from 'jquery';
import _ from 'underscore';
import AuthService from '../utils/AuthService';

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

    updateCurrentUser(profile) {
        AuthService.setupAjax();
        $.post({url: `http://localhost:8090/api/usercheck?id=${profile.user_id}&uname=${profile.nickname}&email=${profile.email}`})
            .done((user) => {
                console.log("User successfully saved : " + user);
            })
            .fail((error) => {
                console.log("Error when saving user", error);
            });
        this.dispatch(profile);
    }

}

export default alt.createActions(AppActions);