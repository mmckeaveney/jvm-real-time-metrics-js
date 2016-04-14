import React from 'react';
import ClientApplications from './ClientApplications'
import Chart from './Chart';
import $ from 'jquery';
import EnvironmentInfo from '../components/EnvironmentInfo';


// CSS
require('../styles/MainDashboard.scss');


// Component for the main home dashboard of the application.
class EnvironmentDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
                <div className="row-fluid">
                    <EnvironmentInfo/>
                    <ClientApplications/>
                </div>
        );
    }
}

export default EnvironmentDashboard;

