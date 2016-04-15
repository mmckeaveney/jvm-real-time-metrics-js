import React from 'react';
import { Link } from 'react-router';
import AppActions from '../actions/AppActions';
import AppBar from 'material-ui/lib/app-bar';
import CustomButton from './CustomButton';
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
        var url = `http://localhost:8090/api/user/favourites/save/?userId=${profile.user_id}&favourite=${this.props.application.containerId}`;
        $.post({
            url: url,
        }).done(function () {
                console.log("Successfully saved favourite " + props.application.containerId)
            })
            .fail(function () {
                console.log("Error saving favourite", error)
            });
    }

    render() {
        return (
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
                                <TableRowColumn>40</TableRowColumn>
                                <TableRowColumn>10</TableRowColumn>
                                <TableRowColumn>4</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <CardActions style={{
                        textAlign: "center"
                    }}>
                        <CustomButton label="More Details"
                                      onClick={this.goToDrilldown.bind(this, this.props)}
                                      icon="search" />
                        <CustomButton label="Add to Favourites"
                                      icon="star"
                                      onClick={this.addToFavourites.bind(this, this.props)}/>
                        <CustomButton label="Restart"
                                      icon="refresh"
                                      onClick={this.restartApp.bind(this, this.props)}/>
                        <CustomButton label="Kill"
                                      icon="remove_circle"
                                      onClick={this.killApp.bind(this, this.props)}/>
                    </CardActions>
                    <NotificationSnackbar ref="appKilled"
                                          message={`${this.props.application.appName} Killed.`}
                    />
                    <NotificationSnackbar ref="appRestarted"
                                          message={`${this.props.application.appName} Restarted.`}
                    />
                </MaterialPanel>
        );
    }
}

export default ClientApp;
