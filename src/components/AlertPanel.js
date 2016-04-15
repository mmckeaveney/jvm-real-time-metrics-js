import React from 'react';
import _ from 'underscore';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import FontIcon from 'material-ui/lib/font-icon';
import MaterialPanel from './MaterialPanel';
import Actions from '../actions/AppActions';
import CircularProgress from 'material-ui/lib/circular-progress';
import $ from 'jquery';
import WebSocket from '../utils/WebSocket';
import TimeDelta from '../utils/TimeDelta';

class AlertPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: []
        }
    }

    componentDidMount() {
        this.getLatestAlerts(this.props.appName);
        WebSocket.register([{
            route: '/jvmrt/alertnotification',
            callback: this.getLatestAlerts(this.props.appName)
        }], "/alertnotification");
    }

    getLatestAlerts(appName) {
        var url;
        if (appName == "All") {
            url = "http://localhost:8090/api/alerts/triggered/all";
        } else if (appName == "mostRecent") {
            url = "http://localhost:8090/api/alerts/triggered/mostRecent";
        } else
        {
            url = `http://localhost:8090/api/alerts/triggered/?appName=${appName}`;
        }
        $.getJSON({url: url,
            success: (alerts) => {
                this.setState({
                    alerts: alerts
                });
            }
        });


    }

    render() {
        var alertsMarkup;
        if (this.state.alerts.length > 0) {
            alertsMarkup = _.map(this.state.alerts, (alert, index) => {
                return (
                    <TableRow key={index}>
                        <TableRowColumn>{ alert.appName }</TableRowColumn>
                        <TableRowColumn>{ `${alert.metric} ${alert.condition} ${alert.criteria} ` }</TableRowColumn>
                        <TableRowColumn>{ TimeDelta.calculateTimeDelta(alert.timeLastTriggered/1000) }</TableRowColumn>
                    </TableRow>
                )
            });
        } else {
            alertsMarkup = <div>No alerts triggered at this level.</div>
        }

        return (
            <MaterialPanel title={ `${this.props.appName} Alerts (${this.state.alerts.length})`} icon="notifications">
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false}
                                 adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Application</TableHeaderColumn>
                            <TableHeaderColumn>Alert</TableHeaderColumn>
                            <TableHeaderColumn>Time Triggered</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        { alertsMarkup }
                    </TableBody>
                </Table>
            </MaterialPanel>
        );
    }
}

export default AlertPanel;
