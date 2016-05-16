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

class QueryTimePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryTimes: []
        }
    }

    componentDidMount() {
        this.getLatestQueryTimes(this.props.appName);
        WebSocket.register([{
            route: '/jvmrt/queryTimeUpdate',
            callback: this.getLatestQueryTimes(this.props.appName)
        }], "/querytimepoll");
    }

    getLatestQueryTimes(criteria) {
        var url;
        if (criteria == "All") {
            url = "http://localhost:8090/api/querytime/all";
        } else if (criteria == "mostRecent") {
            url = "http://localhost:8090/api/querytime/mostRecent";
        } else {
            url = `http://localhost:8090/api/querytime/?appName=${criteria}`;
        }
        $.getJSON({url: url,
            success: (queryTimes) => {
                this.setState({
                    queryTimes: queryTimes
                });
            }
        });
    }

    render() {
        var queryTimesMarkup;
        if (this.state.queryTimes.length > 0) {
            queryTimesMarkup = _.map(this.state.queryTimes, (queryTime, index) => {
                return (
                    <TableRow key={index}>
                        <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>{ queryTime.applicationName  }</TableRowColumn>
                        <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>{ queryTime.className }</TableRowColumn>
                        <TableRowColumn>{ queryTime.methodName }</TableRowColumn>
                        <TableRowColumn>{ queryTime.executionTime }ms</TableRowColumn>
                        <TableRowColumn>{ TimeDelta.calculateTimeDelta(queryTime.timeExecuted/1000) }</TableRowColumn>
                    </TableRow>
                )
            });
        } else {
            queryTimesMarkup = <div>No queries run at this level.</div>
        }

        return (
            <MaterialPanel title={ `${this.props.appName} Query Times (${this.state.queryTimes.length})`} icon="watch_later">
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false}
                                 adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Application</TableHeaderColumn>
                            <TableHeaderColumn>Class</TableHeaderColumn>
                            <TableHeaderColumn>Method</TableHeaderColumn>
                            <TableHeaderColumn>Execution Time</TableHeaderColumn>
                            <TableHeaderColumn>Time Executed</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        { queryTimesMarkup }
                    </TableBody>
                </Table>
            </MaterialPanel>
        );
    }
}

export default QueryTimePanel;
