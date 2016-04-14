import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import _ from 'underscore';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
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
            <MaterialPanel title={ `${this.props.appName} Metrics`}>
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
