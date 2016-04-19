import React from 'react';
import _ from 'underscore';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import MaterialPanel from './MaterialPanel';
import Actions from '../actions/AppActions';
import CircularProgress from 'material-ui/lib/circular-progress';
import $ from 'jquery';
import WebSocket from '../utils/WebSocket';
import TimeDelta from '../utils/TimeDelta';

class ExceptionPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exceptions: []
        }
    }

    componentDidMount() {
        this.getLatestExceptions(this.props.appName);
        WebSocket.register([{
            route: '/jvmrt/exceptionsUpdate',
            callback: this.getLatestExceptions(this.props.appName)
        }], "/exceptionspoll");
    }

    getLatestExceptions(criteria) {
        var url;
        if (criteria == "All") {
            url = "http://localhost:8090/api/exception/all";
        } else if (criteria == "mostRecent") {
            url = "http://localhost:8090/api/exception/mostRecent";
        } else {
            url = `http://localhost:8090/api/exception/?appName=${criteria}`;
        }
        $.getJSON({url: url,
            success: (exceptions) => {
                this.setState({
                    exceptions: exceptions
                });
            }
        });
    }

    render() {
        var exceptionsMarkup;
        if (this.state.exceptions.length > 0) {
            exceptionsMarkup = _.map(this.state.exceptions, (exception, index) => {
                return (
                    <TableRow key={index}>
                        <TableRowColumn>{ exception.applicationName  }</TableRowColumn>
                        <TableRowColumn>{ exception.exceptionType }</TableRowColumn>
                        <TableRowColumn>{ exception.exceptionClass }</TableRowColumn>
                        <TableRowColumn>{ exception.exceptionMethod }</TableRowColumn>
                        <TableRowColumn>{ TimeDelta.calculateTimeDelta(exception.time) }</TableRowColumn>
                    </TableRow>
                )
            });
        } else {
            exceptionsMarkup = <div>No exceptions thrown at this level.</div>
        }

        return (
            <MaterialPanel title={ `${this.props.appName} Exceptions (${this.state.exceptions.length})`} icon="warning">
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false}
                                 adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Application</TableHeaderColumn>
                            <TableHeaderColumn>Exception</TableHeaderColumn>
                            <TableHeaderColumn>Class</TableHeaderColumn>
                            <TableHeaderColumn>Method</TableHeaderColumn>
                            <TableHeaderColumn>Time</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        { exceptionsMarkup }
                    </TableBody>
                </Table>
            </MaterialPanel>
        );
    }
}

export default ExceptionPanel;
