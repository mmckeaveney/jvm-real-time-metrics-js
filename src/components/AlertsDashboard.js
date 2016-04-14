import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Chart from './Chart';
import MaterialPanel from './MaterialPanel';
import Alert from './Alert';
import NewAlert from './NewAlert';
import connectToStores from 'alt/utils/connectToStores';
import AppActions from '../actions/AppActions';
import AlertStore from '../stores/AlertStore';

// CSS
require('../styles/MainDashboard.scss');

@connectToStores
class AlertsDashboard extends React.Component {
    constructor(props) {
        super(props);
        AppActions.fetchLatestAlerts();
    }

    static getStores(props) {
        return [AlertStore];
    }

    static getPropsFromStores(props) {
        return AlertStore.getState();
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
                <MaterialPanel title={ `Alerts for User`}>
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
