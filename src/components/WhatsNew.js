import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import MaterialPanel from './MaterialPanel';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import EventPanel from './EventPanel';

// CSS
require('../styles/MainDashboard.scss');


class WhatsNew extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4" id="whats-new" style={{marginTop:"10px"}}>
                <MaterialPanel title="Latest" subtitle="The Latest From Your Environment">

                    <EventPanel appName="All"/>

                    <MaterialPanel title="Exceptions">
                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false}
                                         adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Application</TableHeaderColumn>
                                    <TableHeaderColumn>Exception</TableHeaderColumn>
                                    <TableHeaderColumn>Time</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn>App</TableRowColumn>
                                    <TableRowColumn>SQLException</TableRowColumn>
                                    <TableRowColumn>2 hours ago</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </MaterialPanel>
                    <MaterialPanel title="Alerts">
                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false}
                                         adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Event</TableHeaderColumn>
                                    <TableHeaderColumn>Type</TableHeaderColumn>
                                    <TableHeaderColumn>Time</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn>App updated</TableRowColumn>
                                    <TableRowColumn>Update</TableRowColumn>
                                    <TableRowColumn>2 hours ago</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </MaterialPanel>
            </MaterialPanel>
        </div> );
    }
}

export default WhatsNew;
