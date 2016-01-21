import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import RaisedButton from 'material-ui/lib/raised-button';
import Chart from './Chart';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import _ from 'underscore';

@connectToStores
class ClientAppDrilldown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false
        }
    }

    static getStores(props) {
        return [ClientApplicationStore];
    }

    static getPropsFromStores(props) {
        return ClientApplicationStore.getState();
    }

    render() {
        var styles = {
            fontWeight: "bold",
            textAlign: "center"
        }


        var config = {
            title: {
                text: this.props.title + " Metrics"
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [{
                name: 'CPU Usage',
                data: [2900.9, 1000.5, 1060.4, 1290.2, 1440.0, 1760.0, 1350.6, 1480.5, 2160.4, 1940.1, 950.6, 540.4]
            },
                {
                    name: 'Heap Space',
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                },
                {
                    name: 'Exceptions Thrown',
                    data: [29, 13, 10, 100, 50, 40, 30, 20, 10, 9, 8, 1, 10, 19, 15]
                }
            ]
        };

        var actuatorMetrics = this.props.clientApplications[this.props.params.id].actuatorMetrics;

        var actuatorMarkup = _.map(actuatorMetrics, (value, key) => {
            return (
                <tr>
                    <td> {key} </td>
                    <td> {value} </td>
                </tr>
            )
        });

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="panel panel-primary">
                    <div className="panel-heading">{this.props.title}</div>
                    <div className="panel-body">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Events</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table">
                                    <tr>
                                        <th>Event</th>
                                        <th>Type</th>
                                        <th>Time</th>
                                    </tr>
                                    <tr>
                                        <td>Updated to version 1.1 </td>
                                        <td>Update/Release</td>
                                        <td>1 hour ago</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        </div>

                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Exceptions</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table">
                                    <tr>
                                        <th>Exception</th>
                                        <th>Time</th>
                                    </tr>
                                    <tr>
                                        <td>SQLException</td>
                                        <td>1 hour ago</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Alerts</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table">
                                    <tr>
                                        <th>Event</th>
                                        <th>Type</th>
                                        <th>Time</th>
                                    </tr>
                                    <tr>
                                        <td>Updated to version 1.1 </td>
                                        <td>Update/Release</td>
                                        <td>1 hour ago</td>
                                        <td><RaisedButton label="See Alert" style={{margin:"5px"}} secondary={true} /></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Metrics</h3>
                                </div>
                                <div className="panel-body">
                                    <table className="table">
                                        <tr>
                                            <th>Key</th>
                                            <th>Value</th>
                                        </tr>
                                        {actuatorMarkup}
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Query Times</h3>
                                </div>
                                <div className="panel-body">
                                    <table className="table">
                                        <tr>
                                            <th>Query Method</th>
                                            <th>Class</th>
                                            <th>Execution Time</th>
                                            <th>How Long Ago</th>
                                        </tr>
                                        <tr>
                                            <td>updateUserCredentials() </td>
                                            <td>UserDaoImpl</td>
                                            <td>200ms</td>
                                            <td>10 minutes ago</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Chart chartConfig={config}/>
                    </div>
                    <div className="panel-footer">
                        <RaisedButton label="Add to Favourites" secondary={true} /></div>
                </div>
            </div>
        );
    }
}

export default ClientAppDrilldown;
