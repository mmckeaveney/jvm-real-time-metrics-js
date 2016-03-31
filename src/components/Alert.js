import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Checkbox from 'material-ui/lib/checkbox';
import $ from 'jquery';
import AppActions from '../actions/AppActions';
import TimeDelta from '../utils/TimeDelta';

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
            timeLastTriggered: null
        }
    }

    deleteAlert() {
        $.post(`http://localhost:8090/api/alerts/delete/${this.props.id}`);
        AppActions.deleteAlert(this.props.id);
    }

    resetAlert() {
        $.post(`http://localhost:8090/api/alerts/reset/${this.props.id}`);
        this.setState({
          triggered: false
        });
    }

    render() {
        return (
            <TableRow>
                <TableRowColumn>{this.props.appName}</TableRowColumn>
                <TableRowColumn>{this.props.metric}</TableRowColumn>
                <TableRowColumn>{this.props.condition}</TableRowColumn>
                <TableRowColumn>{this.props.criteria}</TableRowColumn>
                <TableRowColumn>{this.props.user}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton label="DELETE" primary={true} onClick={this.deleteAlert.bind(this, this.props)}/>
                    <RaisedButton label="RESET" onClick={this.resetAlert.bind(this, this.props)}/>
                </TableRowColumn>
                <TableRowColumn> <Checkbox checked={this.props.triggered} disabled={true} /> </TableRowColumn>
                <TableRowColumn> {TimeDelta.timestampToDateTime(this.props.timeLastTriggered)} </TableRowColumn>
            </TableRow>
        );
    }
}

export default Alert;
