import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import Chart from './Chart';

// CSS
require('../styles/MainDashboard.scss');


class Drilldown extends React.Component {
    constructor(props) {
        super(props);
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
                                    <tr>
                                        <td>Went down for 20 minutes. </td>
                                        <td>Downtime</td>
                                        <td>2 Hours ago</td>
                                    </tr>
                                    <tr>
                                        <td>Updated to version 2.1.1-SNAPSHOT</td>
                                        <td>Update/Release</td>
                                        <td>30 minutes ago</td>
                                    </tr>
                                    <tr>
                                        <td>CPU usage exceeded 10000 </td>
                                        <td>Metric Threshold Breach</td>
                                        <td>20 minutes ago</td>
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
                                    <tr>
                                        <td>NullPointerException</td>
                                        <td>2 Hours ago</td>
                                    </tr>
                                    <tr>
                                        <td>NumberFormatException</td>
                                        <td>30 Minutes Ago</td>
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
                                    <tr>
                                        <td>Went down for 20 minutes. </td>
                                        <td>Downtime</td>
                                        <td>2 Hours ago</td>
                                        <td><RaisedButton label="See Alert" style={{margin:"5px"}} secondary={true} /></td>
                                    </tr>
                                    <tr>
                                        <td>Updated to version 2.1.1-SNAPSHOT</td>
                                        <td>Update/Release</td>
                                        <td>30 minutes ago</td>
                                        <td><RaisedButton label="See Alert" style={{margin:"5px"}} secondary={true} /></td>
                                    </tr>
                                    <tr>
                                        <td>CPU usage exceeded 10000 </td>
                                        <td>Metric Threshold Breach</td>
                                        <td>20 minutes ago</td>
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
                                        <tr>
                                            <td>Memory </td>
                                            <td>276480</td>
                                        </tr>
                                        <tr>
                                            <td>Memory Free </td>
                                            <td>123798</td>
                                        </tr>
                                        <tr>
                                            <td>Processors</td>
                                            <td>6</td>
                                        </tr>
                                        <tr>
                                            <td>Instance Uptime </td>
                                            <td>32771</td>
                                        </tr>
                                        <tr>
                                            <td>System load average </td>
                                            <td>0.68</td>
                                        </tr>
                                        <tr>
                                            <td>Heap Used </td>
                                            <td>152681</td>
                                        </tr>
                                        <tr>
                                            <td>Threads </td>
                                            <td>13</td>
                                        </tr>
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
                                        <tr>
                                            <td>createNewType() </td>
                                            <td>TypeDaoImpl</td>
                                            <td>100ms</td>
                                            <td>2 Hours ago</td>
                                        </tr>
                                        <tr>
                                            <td>editUserCredentials()</td>
                                            <td>UserDaoImpl</td>
                                            <td>30ms</td>
                                            <td>30 minutes ago</td>
                                        </tr>
                                        <tr>
                                            <td>insertNewProduct()</td>
                                            <td>ProductDaoImpl</td>
                                            <td>200ms</td>
                                            <td>3 hours ago</td>
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

export default Drilldown;
