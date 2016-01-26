import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import _ from 'underscore';

@connectToStores
class RealTimeMetricsPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    static getStores(props) {
        return [ClientApplicationStore];
    }

    static getPropsFromStores(props) {
        return ClientApplicationStore.getState();
    }

    render() {
        var actuatorMetrics = this.props.actuatorMetrics;
        var appName = this.props.appName;

        var actuatorMarkup = _.map(actuatorMetrics, (value, key) => {
            return (
                <tr>
                    <td> {key} </td>
                    <td> {value} </td>
                </tr>
            )
        });

        return (
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">{appName} Metrics</h3>
                    </div>
                    <div className="panel-body">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                            {actuatorMarkup}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default RealTimeMetricsPanel;
