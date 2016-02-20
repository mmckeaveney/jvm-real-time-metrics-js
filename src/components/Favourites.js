require('highcharts-release/themes/dark-unica.js');
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';
import Chart from "./Chart";
import MaterialPanel from './MaterialPanel';

// CSS
require('../styles/MainDashboard.scss');


class Favourites extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var config = {
            title: {
                text: 'ReactClient'
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

        var config2 = {
            title: {
                text: 'JVClient'
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
                name: 'Active HTTP Sessions',
                data: [10, 20, 25, 100, 200, 400, 1, 1000, 900, 800, 400, 36]
            },
            {
                name: 'Uptime',
                data: [2900.9, 7100.5, 10600.4, 1290.2, 14400.0, 17600.0, 1350.6, 14800.5, 21600.4, 19400.1, 9500.6, 5400.4]
            },
            {
                name: 'Threads',
                data: [29, 13, 10, 100, 50, 40, 30, 20, 10, 9, 8, 1, 10, 19, 15]
            }
            ]
        };


        return (
            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7" id="article-panel-container" style={{marginTop:"10px"}}>
                <MaterialPanel title="Favourites" subtitle="Applications added to your favourites">
                        <Chart chartConfig={config}/>
                        <Chart chartConfig={config2}/>

                </MaterialPanel>
            </div>
        );
    }
}

export default Favourites;
