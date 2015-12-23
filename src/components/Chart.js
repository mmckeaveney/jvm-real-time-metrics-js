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

// CSS
require('../styles/MainDashboard.scss');


class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var style = {
         textAlign:"center",
         padding:"10px",
         borderRadius: "10px"
        };

        return (
            <div className="chart-container" style={style}>
                    <ReactHighcharts config = {this.props.chartConfig}/>

            </div>

        );
    }
}

export default Chart;
