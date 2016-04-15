import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import CustomButton from './CustomButton';
import AlertDropdown from './AlertDropdown';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TextField from 'material-ui/lib/text-field';
import $ from 'jquery';
import AppActions from '../actions/AppActions';
import NotificationSnackbar from './NotificationSnackbar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

class NewAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apps: [],
            metrics: [
                "gcps_marksweeptime", "gaugeresponsemetrics", "classes", "gcps_marksweepcount",
                "threadstotalStarted", "processors", "heapinit", "memfree", "systemloadaverage",
                "gcps_scavengetime", "mem", "counterstatus200metrics", "heap", "heapused", "instanceuptime",
                "gcps_scavengecount", "heapcommitted", "threads", "httpsessionsmax", "uptime", "classesloaded",
                "httpsessionsactive", "threadspeak", "classesunloaded", "threadsdaemon"
            ],
            conditions: ["Less Than", "Greater Than"],
            criteria: null,
            users: [],
            errorText: ''
        }
    }

    componentWillMount() {
        $.getJSON({
            url: "http://localhost:8090/api/users/all",
            success: (users) => {
                this.setState({
                    users: users
                });
            }
        });

        $.getJSON({
            url: "http://localhost:8090/api/clientapps/names/all",
            success: (clientApps) => {
                this.setState({
                    apps: clientApps
                });
            }
        });
    }

    handleCriteriaChange = (event) => {
        this.setState({
            criteria: event.target.value
        });
    };

    saveAlert() {
        var number = this.refs.criteria.props.value;
        if (isNaN(parseFloat(number)) && !isFinite(number)) {
            this.setState({
                errorText: "Must be a number."
            });

        } else {

            var alert = {
                appName: this.refs.appName.props.data[this.refs.appName.state.value],
                metric: this.refs.metric.props.data[this.refs.metric.state.value],
                condition: this.refs.condition.props.data[this.refs.condition.state.value],
                criteria: number,
                user: this.refs.user.props.data[this.refs.user.state.value]
            }
            var snackBar = this.refs.newAlert;
            $.ajax({
                url: `http://localhost:8090/api/alerts/add`,
                type: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(alert),
                dataType: 'json',
                success: (alert) => {
                    console.log(alert)
                    AppActions.saveAlert(alert);
                    snackBar.show();
                },
                error: (error) => {
                    console.log("error when saving alert", error);
                }
            });
        }
    }

    render() {
        return (
            <TableRow>
                <TableRowColumn><AlertDropdown data={this.state.apps} ref="appName"/></TableRowColumn>
                <TableRowColumn><AlertDropdown data={this.state.metrics} ref="metric"/></TableRowColumn>
                <TableRowColumn><AlertDropdown data={this.state.conditions} ref="condition"/></TableRowColumn>
                <TableRowColumn>
                    <TextField
                        ref="criteria"
                        value={this.state.criteria}
                        floatingLabelText="Alert Criteria"
                        onChange={this.handleCriteriaChange}
                        errorText={this.state.errorText}
                    /></TableRowColumn>
                <TableRowColumn><AlertDropdown data={this.state.users} ref="user"/></TableRowColumn>
                <TableRowColumn>
                    <CustomButton label="Save"
                                  icon=""
                                  onClick={this.deleteAlert.bind(this, this.props)}/>
                    <FloatingActionButton mini={true} onClick={this.saveAlert.bind(this, this.props)}>
                        <ContentAdd />
                    </FloatingActionButton>
                </TableRowColumn>
                <TableRowColumn>N/A</TableRowColumn>
                <TableRowColumn>N/A</TableRowColumn>
                <NotificationSnackbar ref="newAlert" message="New Alert added." />
            </TableRow>
        );
    }
}

export default NewAlert;
