require('highcharts-release/themes/dark-unica.js');
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'underscore';

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

    componentDidMount() {
        this.getTimeSeriesDataFromServer("week");
    }

    getTimeSeriesDataFromServer(timeScale) {
        var timeSeriesUrl = `http://localhost:8090/api/timeseries/?appName=${this.props.appName}&timeScale=${timeScale}`;
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
                            },
                            enableMouseTracking: false
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
                    <RaisedButton label="Last Week" secondary={true}/>
                    <RaisedButton label="Last Month" secondary={true}/>
                    <RaisedButton label="Last 6 Months" secondary={true}/>
                </div>

            );
        } else {
            return <CircularProgress mode="indeterminate" />

        }
    }
}

export default Chart;
