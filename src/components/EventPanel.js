import React from 'react';
import _ from 'underscore';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MaterialPanel from './MaterialPanel';
import Actions from '../actions/AppActions';
import CircularProgress from 'material-ui/CircularProgress';
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
        }], "/eventspoll");
    }

    getLatestEvents(criteria) {
        var url;
        if (criteria == "All") {
            url = "http://localhost:8090/api/events/all";
        } else if (criteria == "mostRecent") {
            url = "http://localhost:8090/api/events/mostRecent";
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
           eventsMarkup = <div>No events at this level.</div>
        }

        var styles = {
            textStyles: {
                fontSize: 30
            },
            cardStyles: {
                fontSize: 20,
                border: "1px solid #4527A0",
                margin: 20
            },
            headerStyles: {
                fontSize: 30
            }
        }

        return (
                <MaterialPanel title={ `${this.props.appName} Events (${this.state.events.length})`} icon="event">
                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false}
                                         adjustForCheckbox={false}
                                         style={styles.headerStyles}>
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
