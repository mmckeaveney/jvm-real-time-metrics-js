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
import { hashHistory } from 'react-router'
import AuthService from '../utils/AuthService';
import UserStore from '../stores/UserStore';

// CSS
require('../styles/MainDashboard.scss');


class ClientApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: null
        }
    }

    componentWillMount() {

    }

    killApp() {
        var props = this.props;
        $.post(`http://localhost:8090/api/docker/kill/${props.application.containerId}`)
            .done(function () {
                console.log("Successfully killed docker container " + props.application.containerId)
            })
            .fail(function (error) {
                console.log("Error when killing docker container", error)
            });
        this.refs.appKilled.show();
    }

    restartApp() {
        var props = this.props;
        $.post(`http://localhost:8090/api/docker/restart/${props.application.containerId}`)
            .done(function () {
                console.log("Successfully restarted docker container " + props.application.containerId)
            })
            .fail(function () {
                console.log("Error when restarting docker container", error)
            });
        this.refs.appRestarted.show();
    }

    goToDrilldown() {
        hashHistory.push(`/appdetail/${this.props.application.containerId}`);
    }

    addToFavourites() {
        // Store user data in a store
        var profile = UserStore.getState().user;
        var url = `http://localhost:8090/api/user/favourites/save/?userId=${profile.user_id}`;
        $.post({
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            data: {
                'favourite' : this.props.application.containerId
            }
        }).done(function () {
                console.log("Successfully saved favourite " + props.application.containerId)
            })
            .fail(function () {
                console.log("Error saving favourite", error)
            });
    }

    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <MaterialPanel title={this.props.application.appName}>
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
                                      default={true}/>
                        <RaisedButton label="Add to Favourites" default={true}
                                      onClick={this.addToFavourites.bind(this, this.props)}/>
                        <RaisedButton label="Restart" default={true}
                                      onClick={this.restartApp.bind(this, this.props)}/>
                        <RaisedButton label="Kill" default={true}
                                      onClick={this.killApp.bind(this, this.props)}/>
                    </CardActions>
                </MaterialPanel>
                <NotificationSnackbar ref="appKilled"
                                      message={`${this.props.application.appName} Killed.`}
                />
                <NotificationSnackbar ref="appRestarted"
                                      message={`${this.props.application.appName} Restarted.`}
                />
            </div>
        );
    }
}

export default ClientApp;
