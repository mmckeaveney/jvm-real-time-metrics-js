import React from 'react';
import { Link } from 'react-router';
import AppActions from '../actions/AppActions';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import Chart from './Chart';
import _ from 'underscore';
import MaterialPanel from './MaterialPanel';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import CardActions from 'material-ui/lib/card/card-actions';

// CSS
require('../styles/MainDashboard.scss');


class ClientApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : null,
            actuatorMetrics : null
        }
    }

    render() {
        var styles = {
            fontWeight: "bold",
            textAlign: "center"
        }




        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <MaterialPanel title={this.props.title}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false}
                                 adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Events</TableHeaderColumn>
                            <TableHeaderColumn>Exceptions</TableHeaderColumn>
                            <TableHeaderColumn>Alerts</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>TO BE IMPLEMENTED</TableRowColumn>
                            <TableRowColumn>TO BE IMPLEMENTED</TableRowColumn>
                            <TableRowColumn>TO BE IMPLEMENTED</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                    <CardActions>
                    <RaisedButton label="More Details"
                                  containerElement={<Link to={`/appdetail/${this.props.title}`}/> }
                                  linkButton={true}
                                  secondary={true} />
                    <RaisedButton label="Add to Favourites" secondary={true} />
                    </CardActions>
                    </MaterialPanel>
                </div>
        );
    }
}

export default ClientApp;
