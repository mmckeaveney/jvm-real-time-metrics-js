import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';


// CSS
require('../styles/MainDashboard.scss');


class WhatsNew extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4" id="whats-new" style={{marginTop:"10px"}}>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Latest</h3>
                            </div>
                            <div className="panel-body">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Events</h3>
                                    </div>
                                    <div className="panel-body">
                                        <table className="table">
                                            <tr>
                                                <th>Application</th>
                                                <th>Event</th>
                                                <th>Type</th>
                                                <th>Time</th>
                                            </tr>
                                            <tr>
                                                <td>JVClient </td>
                                                <td>Updated to version 1.1 </td>
                                                <td>Update/Release</td>
                                                <td>1 hour ago</td>
                                            </tr>
                                            <tr>
                                                <td>ReactClient</td>
                                                <td>Went down for 20 minutes. </td>
                                                <td>Downtime</td>
                                                <td>2 Hours ago</td>
                                            </tr>
                                            <tr>
                                                <td>ReactClient</td>
                                                <td>Updated to version 2.1.1-SNAPSHOT</td>
                                                <td>Update/Release</td>
                                                <td>30 minutes ago</td>
                                            </tr>
                                            <tr>
                                                <td>ReactClient</td>
                                                <td>CPU usage exceeded 10000 </td>
                                                <td>Metric Threshold Breach</td>
                                                <td>20 minutes ago</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Exceptions</h3>
                                    </div>
                                    <div className="panel-body">
                                        <table className="table">
                                            <tr>
                                                <th>Application</th>
                                                <th>Exception</th>
                                                <th>Time</th>
                                            </tr>
                                            <tr>
                                                <td>JVClient</td>
                                                <td>SQLException</td>
                                                <td>1 hour ago</td>
                                                <td>See more</td>
                                            </tr>
                                            <tr>
                                                <td> ReactClient </td>
                                                <td>NullPointerException</td>
                                                <td>2 Hours ago</td>
                                                <td>See more</td>
                                            </tr>
                                            <tr>
                                                <td> ReactClient </td>
                                                <td>NumberFormatException</td>
                                                <td>30 Minutes Ago</td>
                                                <td>See more</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
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
                                                <td>JVClient updated to version 1.1 </td>
                                                <td>Update/Release</td>
                                                <td>1 hour ago</td>
                                            </tr>
                                            <tr>
                                                <td>ReactClient went down for 20 minutes. </td>
                                                <td>Downtime</td>
                                                <td>2 Hours ago</td>
                                            </tr>
                                            <tr>
                                                <td>ReactClient updated to version 2.1.1-SNAPSHOT</td>
                                                <td>Update/Release</td>
                                                <td>30 minutes ago</td>
                                            </tr>
                                            <tr>
                                                <td>ReactClient CPU usage exceeded 10000 </td>
                                                <td>Metric Threshold Breach</td>
                                                <td>20 minutes ago</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
        );
    }
}

export default WhatsNew;
