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

class EventPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
       this.getLatestEvents(this.props.appName)
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

    calculateTimeDelta(eventTime) {
        var dateFuture = new Date(new Date().getFullYear() +1, 0, 1);
        var dateNow = new Date();

        var seconds = Math.floor((dateFuture - (dateNow))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    }

    render() {
        var eventsMarkup;
        if (this.state.events) {
            eventsMarkup = _.map(this.state.events, (event) => {
                return (
                    <TableRow>
                        <TableRowColumn>{ event.image }</TableRowColumn>
                        <TableRowColumn>{ event.status }</TableRowColumn>
                        <TableRowColumn>{ event.time }</TableRowColumn>
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
