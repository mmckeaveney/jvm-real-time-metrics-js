import React from 'react';
import ClientApplications from './ClientApplications'
import Chart from './Chart';
import $ from 'jquery';


// CSS
require('../styles/MainDashboard.scss');


// Component for the main home dashboard of the application.
class EnvironmentDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var config = {
            title: {
                text: 'Aggregated Environment Metrics'
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
                <div className="row-fluid">
                    <Chart chartConfig={config}/>
                    <ClientApplications/>
                </div>
        );
    }
}

export default EnvironmentDashboard;

