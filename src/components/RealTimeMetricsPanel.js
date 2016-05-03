import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import _ from 'underscore';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MaterialPanel from './MaterialPanel';

class RealTimeMetricsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var actuatorMarkup = _.map(this.props.actuatorMetrics, (value, key) => {
            return (
                <TableRow key={key}>
                    <TableRowColumn>{ key }</TableRowColumn>
                    <TableRowColumn>{ value }</TableRowColumn>
                </TableRow>
            )
        });

        return (
            <MaterialPanel title={ `${this.props.appName} Metrics`} icon="show_chart">
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false}
                                 adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Key</TableHeaderColumn>
                            <TableHeaderColumn>Value</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {actuatorMarkup}
                    </TableBody>
                </Table>
            </MaterialPanel>

        );
    }
}

export default RealTimeMetricsPanel;
