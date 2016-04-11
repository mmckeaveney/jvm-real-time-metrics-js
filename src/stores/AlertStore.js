import alt from '../alt'
import React from 'react';
import Actions from '../actions/AppActions';
import { decorate, bind } from 'alt/utils/decorators'
import _ from 'underscore';

@decorate(alt)
class AlertStore {

    constructor() {
        this.state = {
            alerts : []
        }
    }

    @bind(Actions.updateLatestAlerts)
    updateLatestAlerts(alerts) {
        this.setState({
            alerts: alerts
        });
    }

    @bind(Actions.saveAlert)
    saveAlert(alert) {
        this.setState({
            alerts: this.state.alerts.concat([alert])
        });
    }

    @bind(Actions.updateTriggeredAlert)
    updateTriggeredAlert(alert) {
        var alerts = this.state.alerts;
        var index = _.findIndex(currentAlerts, (currentAlert) => {
            currentAlert.id == alert.id;
        });
        alerts[index] = alert;

        this.setState({
            alerts: alerts
        });
    }

    @bind(Actions.deleteAlert)
    deleteAlert(id) {
        var updatedAlerts = this.state.alerts.filter(function (alert) {
            return alert.id !== id;
        });

        this.setState({
            alerts: updatedAlerts
        });
    }
}

export default alt.createStore(AlertStore);
