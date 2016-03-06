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

class EventPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
       this.getLatestEvents(this.props.appName);
        WebSocket.register([{
            route: '/jvmrt/eventsUpdate',
            callback: this.getLatestEvents(this.props.appName)
        }]);
    }

    getLatestEvents(criteria) {
        var url;
        if (criteria == "All") {
            url = "http://localhost:8090/api/events/all";
        } else {
            url = `http://localhost:8090/api/events/?appName=${criteria}`;
        }
        $.getJSON({url: url,
            success: (events) => {
                this.setState({
                    events: events
                });
            }
        });
    }

    render() {
        var eventsMarkup;
        if (this.state.events) {
            eventsMarkup = _.map(this.state.events, (event, index) => {
                return (
                    <TableRow key={index}>
                        <TableRowColumn>{ event.image }</TableRowColumn>
                        <TableRowColumn>{ event.status }</TableRowColumn>
                        <TableRowColumn>{ TimeDelta.calculateTimeDelta(event.time) }</TableRowColumn>
                    </TableRow>
                )
            });
        } else {
           eventsMarkup = <CircularProgress />
        }

        return (
                <MaterialPanel title={ `${this.props.appName} Events`}>
                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false}
                                         adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Application</TableHeaderColumn>
                                        <TableHeaderColumn>Event</TableHeaderColumn>
                                        <TableHeaderColumn>Time</TableHeaderColumn>
                                    </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                { eventsMarkup }
                            </TableBody>
                        </Table>
                    </MaterialPanel>
        );
    }
}

export default EventPanel;
