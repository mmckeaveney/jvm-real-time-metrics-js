import alt from '../alt';
import $ from 'jquery';
import _ from 'underscore';

class AppActions {

    constructor() {
        this.generateActions('updateLatestEvents');
        this.generateActions('updateLatestApplicationMetadata');
    }

    getLatestEvents(criteria) {
        var url;
        if (criteria == "All") {
           url = "http://localhost:8090/api/events/all";
        } else {
           url = `http://localhost:8090/api/events/?${criteria}`;
        }
        $.getJSON({url: url,
            success: (events) => {
                this.setState({
                    events: events
                });
            }
        });
    }

    getTimeSeriesMetricsForSingleApp(appName, timeScale) {
        var timeSeriesUrl = `http://localhost:8090/timeseries/?appName=${appName}&timeScale=${timeScale}`;
        $.ajax({
            url: timeSeriesUrl,
            type: "GET",
            dataType: "json",
            success: (timeseries) => {
                var config = {
                    title: {
                        text: appName + " Metrics"
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
                        categories: []
                    },
                    series: []
                };

                timeseries.timeStamps.forEach((timeStamp) => {
                    config.xAxis.categories.push(timeStamp);
                });

                _.map(timeseries.timeSeriesMetrics, (value, key) => {
                    config.series.push({
                        name: key,
                        data: value
                    })
                });
            },
            error: (error) => {
                console.log("There was an issue getting timeSeries data", error);
            }
        });
    }

}

export default alt.createActions(AppActions);