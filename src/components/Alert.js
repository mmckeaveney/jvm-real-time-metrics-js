import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CustomButton from './CustomButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import $ from 'jquery';
import AppActions from '../actions/AppActions';
import TimeDelta from '../utils/TimeDelta';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NotificationSnackbar from './NotificationSnackbar';

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appName: null,
            metric: null,
            condition: null,
            criteria: null,
            user: null,
            triggered: false,
            timeLastTriggered: null,
            open: false
        }
    }

    deleteAlert() {
        $.post(`http://localhost:8090/api/alerts/delete/${this.props.id}`);
        AppActions.deleteAlert(this.props.id);
        this.refs.deleteAlert.show;
    }

    resetAlert() {
        AppActions.resetAlert(this.props.id);
        $.post(`http://localhost:8090/api/alerts/reset/${this.props.id}`);
        this.setState({
          triggered: false
        });
        this.refs.resetAlert.show;
    }

    render() {

        var resetButton;
           if (this.props.triggered) {
               resetButton =   <CustomButton label="Reset"
                                             icon="refresh"
                                             onClick={this.resetAlert.bind(this, this.props)}/>
           }

        return (
            <TableRow>
                <TableRowColumn>{this.props.appName}</TableRowColumn>
                <TableRowColumn>{this.props.metric}</TableRowColumn>
                <TableRowColumn>{this.props.condition}</TableRowColumn>
                <TableRowColumn>{this.props.criteria}</TableRowColumn>
                <TableRowColumn>{this.props.user}</TableRowColumn>
                <TableRowColumn>
                    <CustomButton label="Delete"
                                  icon="clear"
                                  onClick={this.deleteAlert.bind(this, this.props)}/>
                    {resetButton}
                </TableRowColumn>
                <TableRowColumn> <Toggle toggled={this.props.triggered} /> </TableRowColumn>
                <TableRowColumn> {this.props.timeLastTriggered == 0 ? "N/A" : TimeDelta.calculateTimeDelta(this.props.timeLastTriggered/1000)} </TableRowColumn>
                <NotificationSnackbar ref="deleteAlert" message="Alert Deleted." />
                <NotificationSnackbar ref="resetAlert" message="Alert Reset." />
            </TableRow>

        );
    }
}

export default Alert;
