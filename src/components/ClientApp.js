import React from 'react';
import { Link } from 'react-router';
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
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <div className="panel panel-primary" style={styles}>
                            <div className="panel-heading">{this.props.title}</div>
                            <div className="panel-body">
                                <table className="table" >
                                    <tbody>
                                    <tr>
                                        <th>Events</th>
                                        <th>Exceptions</th>
                                        <th>Alerts</th>
                                    </tr>
                                    <tr>
                                        <td>TO BE IMPLEMENTED</td>
                                        <td>TO BE IMPLEMENTED</td>
                                        <td>TO BE IMPLEMENTED</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Chart chartConfig={config}/>
                            </div>
                        <div className="panel-footer">
                            <RaisedButton label="More Details"
                                          containerElement={<Link to={`/appdetail/${this.props.index}`}/> }
                                          linkButton={true}
                                          style={{margin:"5px"}}
                                          secondary={true} />
                                <RaisedButton label="Add to Favourites" secondary={true} /></div>
                        </div>
                </div>
        );
    }
}

export default ClientApp;
