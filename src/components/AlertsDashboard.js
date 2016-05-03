import React from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Tabs, Tab} from 'material-ui/Tabs';
import Colors from 'material-ui/styles/colors';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Chart from './Chart';
import MaterialPanel from './MaterialPanel';
import Alert from './Alert';
import NewAlert from './NewAlert';
import connectToStores from 'alt/utils/connectToStores';
import AppActions from '../actions/AppActions';
import AlertStore from '../stores/AlertStore';
import UserStore from '../stores/UserStore';

// CSS
require('../styles/MainDashboard.scss');

@connectToStores
class AlertsDashboard extends React.Component {
    constructor(props) {
        super(props);
        AppActions.fetchLatestAlerts();
    }

    static getStores(props) {
        return [AlertStore, UserStore];
    }

    static getPropsFromStores(props) {
        return {
            ... AlertStore.getState(),
            ... UserStore.getState()
        };
    }

    render() {
        var alerts = this.props.alerts.map((alert, index) => {
            return (
            <Alert key={index}
                   id={alert.id}
                   appName={alert.appName}
                   metric={alert.metric}
                   condition={alert.condition}
                   criteria={alert.criteria}
                   user={alert.user}
                   triggered={alert.triggered}
                   timeLastTriggered={alert.timeLastTriggered}
            />
            )
        });

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <MaterialPanel title={ `Alerts for user ${this.props.user.nickname}`} icon="notifications">
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false}
                                     adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Application</TableHeaderColumn>
                                <TableHeaderColumn>Metrics</TableHeaderColumn>
                                <TableHeaderColumn>Condition</TableHeaderColumn>
                                <TableHeaderColumn>Criteria</TableHeaderColumn>
                                <TableHeaderColumn>Users to Alert</TableHeaderColumn>
                                <TableHeaderColumn>Actions</TableHeaderColumn>
                                <TableHeaderColumn>Triggered?</TableHeaderColumn>
                                <TableHeaderColumn>Time Last Triggered</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {alerts}
                            <NewAlert/>
                        </TableBody>
                    </Table>
                </MaterialPanel>
                </div>
        );
    }
}

export default AlertsDashboard;
