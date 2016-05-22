require('highcharts-release/themes/dark-unica.js');
import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import CustomButton from './CustomButton';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';
import CircularProgress from 'material-ui/lib/circular-progress';
import _ from 'underscore';
import AjaxUrl from '../utils/AjaxUrl';

// CSS
require('../styles/MainDashboard.scss');


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appName: null,
            chartConfig: null
        }
    }

    componentWillMount() {
        this.getTimeSeriesDataFromServer("week");
    }

    getTimeSeriesDataFromServer(timeScale) {
        this.setState({
            chartConfig: null
        });

        var timeSeriesUrl = `http://${AjaxUrl.url}:8090/api/timeseries/?appName=${this.props.appName}&timeScale=${timeScale}`;
        $.ajaxSetup({
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            cache: false
        });
        $.ajax({
            url: timeSeriesUrl,
            type: "GET",
            dataType: "json",
            success: (timeseries) => {
                var config = {
                    title: {
                        text: this.props.appName + " Metrics"
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        title : {
                            text: 'Date'
                        },
                        dateTimeLabelFormats: {
                            month: '%e. %b',
                            year: '%b'
                        },
                    },
                    series: []
                };

                _.map(timeseries.timeSeriesMetrics, (value, key) => {
                    config.series.push({
                        name: key,
                        data: value
                    })
                });

                this.setState({
                    chartConfig: config
                });
            },
            error: (error) => {
                console.log("There was an issue getting timeSeries data", error);
            }
        });
    }

    render() {
        var style = {
         textAlign:"center",
         padding:"10px",
         borderRadius: "10px"
        };

        if (this.state.chartConfig) {
            return (
                <div className="chart-container" style={style}>
                    <ReactHighcharts config={this.state.chartConfig}/>
                    <CustomButton label="Last Week" onClick={this.getTimeSeriesDataFromServer.bind(this, "week")}/>
                    <CustomButton label="Last Month" onClick={this.getTimeSeriesDataFromServer.bind(this, "sixmonths")}/>
                    <CustomButton label="Last 6 Months" onClick={this.getTimeSeriesDataFromServer.bind(this, "sixmonths")}/>
                </div>

            );
        } else {
            return (
            <div style={{textAlign:"center"}}>
                Chart data is loading. Please wait. <br></br>
                <CircularProgress mode="indeterminate" />
            </div>)

        }
    }
}

export default Chart;
