import React from 'react';
import { Link } from 'react-router';
import AppActions from '../actions/AppActions';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import Chart from './Chart';
import _ from 'underscore';
import MaterialPanel from './MaterialPanel';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import CardActions from 'material-ui/lib/card/card-actions';
import $ from 'jquery';
import NotificationSnackbar from './NotificationSnackbar';
import { browserHistory } from 'react-router'

// CSS
require('../styles/MainDashboard.scss');


class ClientApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : null,
            actuatorMetrics : null,
            events: null,
            exceptions: null,
            alerts: null,
            containerId: null
        }
    }

    componentWillMount() {

    }

    killApp() {
        var props = this.props;
        $.post(`http://localhost:8090/api/docker/kill/${props.containerId}`)
            .done(function() {
                console.log("Successfully killed docker container " + props.containerId)
            })
            .fail(function(error) {
                console.log("Error when killing docker container", error)
            });
        this.refs.appKilled.show();
    }

    restartApp() {
        var props = this.props;
        $.post(`http://localhost:8090/api/docker/restart/${props.containerId}`)
            .done(function() {
                console.log("Successfully restarted docker container " + props.containerId)
            })
            .fail(function() {
                console.log("Error when restarting docker container", error)
            });
        this.refs.appRestarted.show();
    }

    goToDrilldown() {
        browserHistory.push(`/appdetail/${this.props.title}`);
    }

    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <MaterialPanel title={this.props.title}>
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false}
                                     adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Events</TableHeaderColumn>
                                <TableHeaderColumn>Exceptions</TableHeaderColumn>
                                <TableHeaderColumn>Alerts</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>TO BE IMPLEMENTED</TableRowColumn>
                                <TableRowColumn>TO BE IMPLEMENTED</TableRowColumn>
                                <TableRowColumn>TO BE IMPLEMENTED</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <CardActions>
                    <RaisedButton label="More Details"
                                  onClick={this.goToDrilldown.bind(this, this.props)}
                                  secondary={true} />
                    <RaisedButton label="Add to Favourites" secondary={true} />
                        <RaisedButton label="Restart" secondary={true}
                                      onClick={this.restartApp.bind(this, this.props)} />
                        <RaisedButton label="Kill" primary={true}
                                      onClick={this.killApp.bind(this, this.props)}/>
                    </CardActions>
                    </MaterialPanel>
                <NotificationSnackbar ref="appKilled"
                                      message={`${this.props.title} Killed.`}
                />
                <NotificationSnackbar ref="appRestarted"
                                      message={`${this.props.title} Restarted.`}
                />
                </div>
        );
    }
}

export default ClientApp;
