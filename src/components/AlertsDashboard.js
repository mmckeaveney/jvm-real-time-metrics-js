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


class AlertsDashboard extends React.Component {
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
                    <div className="panel-heading">Alert Settings</div>
                    <div className="panel-body">
                            /* <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Alert Thresholds for Martin McKeaveney</h3>
                                </div>
                                <div className="panel-body">
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <th>Application</th>
                                            <th>Metrics</th>
                                            <th>Condition</th>
                                            <th>Criteria</th>
                                            <th>Users To Alert</th>
                                            <th>Actions</th>
                                        </tr>
                                        <tr>
                                            <td><RaisedButton label="ReactClient" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="CPU" style={{margin:"5px"}} secondary={true} />
                                            <RaisedButton label="HEAP" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="DROPS BELOW" style={{margin:"5px"}} primary={true} /></td>
                                            <td><RaisedButton label="10000" style={{margin:"5px"}} primary={true} /></td>
                                            <td><RaisedButton label="Martin McKeaveney" style={{margin:"5px"}} secondary={true} />
                                                <RaisedButton label="Ryan Wilson" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="DELETE" style={{margin:"5px"}} primary={true} /></td>
                                        </tr>
                                        <tr>
                                            <td><RaisedButton label="JVClient" style={{margin:"5px"}} secondary={true} />
                                                <RaisedButton label="VBPS" style={{margin:"5px"}} secondary={true} />
                                            </td>
                                            <td><RaisedButton label="UPTIME" style={{margin:"5px"}} secondary={true} />
                                                <RaisedButton label="THREADS" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="EXCEEDS" style={{margin:"5px"}} primary={true} /></td>
                                            <td><RaisedButton label="10000" style={{margin:"5px"}} primary={true} /></td>
                                            <td><RaisedButton label="Martin McKeaveney" style={{margin:"5px"}} secondary={true} />
                                                <RaisedButton label="Mark O'Sullivan" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="DELETE" style={{margin:"5px"}} primary={true} /></td>
                                        </tr>
                                        <tr>
                                            <td><RaisedButton label="ReactClient" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="CPU" style={{margin:"5px"}} secondary={true} />
                                                <RaisedButton label="HEAP" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="DROPS BELOW" style={{margin:"5px"}} primary={true} /></td>
                                            <td><RaisedButton label="10000" style={{margin:"5px"}} primary={true} /></td>
                                            <td><RaisedButton label="Martin McKeaveney" style={{margin:"5px"}} secondary={true} />
                                                <RaisedButton label="Jeff Alvarado" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="DELETE" style={{margin:"5px"}} primary={true} /></td>
                                        </tr>
                                        <tr>
                                            <td><RaisedButton label="ReactClient" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="CPU" style={{margin:"5px"}} secondary={true} />
                                                <RaisedButton label="HEAP" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="DROPS BELOW" style={{margin:"5px"}} primary={true} /></td>
                                            <td><RaisedButton label="10000" style={{margin:"5px"}} primary={true} /></td>
                                            <td><RaisedButton label="Martin McKeaveney" style={{margin:"5px"}} secondary={true} />
                                                <RaisedButton label="Amit Sharma" style={{margin:"5px"}} secondary={true} /></td>
                                            <td><RaisedButton label="DELETE" style={{margin:"5px"}} primary={true} /></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> */
                        </div>
                    </div>
                </div>
        );
    }
}

export default AlertsDashboard;
