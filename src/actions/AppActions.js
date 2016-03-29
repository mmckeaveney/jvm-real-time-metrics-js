import alt from '../alt';
import $ from 'jquery';
import _ from 'underscore';

class AppActions {

    constructor() {
        this.generateActions('updateLatestEvents');
        this.generateActions('saveAlert');
        this.generateActions('updateLatestAlerts');
        this.generateActions('updateLatestApplicationMetadata');
    }

    fetchLatestAlerts() {
        var self = this;
        $.ajax({
            dataType: "json",
            url: "http://localhost:8090/api/alerts/all",
            success: (alerts) => {
                self.actions.updateLatestAlerts(alerts);
            },
            error: (error) => {
                console.log("Error retrieving alerts", error)
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