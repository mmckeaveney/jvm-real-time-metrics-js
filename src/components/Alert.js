import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CustomButton from './CustomButton';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Toggle from 'material-ui/lib/toggle';
import $ from 'jquery';
import AppActions from '../actions/AppActions';
import TimeDelta from '../utils/TimeDelta';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import AjaxUrl from '../utils/AjaxUrl';

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
        $.post(`http://${AjaxUrl.url}:8090/api/alerts/delete/${this.props.id}`);
        AppActions.deleteAlert(this.props.id);
        AppActions.openSnackbar("Alert Deleted.");
    }

    resetAlert() {
        AppActions.resetAlert(this.props.id);
        $.post(`http://${AjaxUrl.url}:8090/api/alerts/reset/${this.props.id}`);
        this.setState({
          triggered: false
        });
        AppActions.openSnackbar("Alert Reset.");
    }

    render() {

        var resetButton;
           if (this.props.triggered) {
               resetButton = <CustomButton label="Reset"
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
                <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>
                    <CustomButton label="Delete"
                                  icon="clear"
                                  onClick={this.deleteAlert.bind(this, this.props)}/>
                    {resetButton}
                </TableRowColumn>
                <TableRowColumn> <Toggle toggled={this.props.triggered} /> </TableRowColumn>
                <TableRowColumn> {this.props.timeLastTriggered == 0 ? "N/A" : TimeDelta.calculateTimeDelta(this.props.timeLastTriggered/1000)} </TableRowColumn>
            </TableRow>

        );
    }
}

export default Alert;
