import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import EnvironmentPage from './EnvironmentPage';
import WhatsNew from './WhatsNew';
import Favourites from './Favourites';
import Drilldown from './Drilldown';
import Alerts from './Alerts';
import $ from 'jquery';


// CSS
require('../styles/MainDashboard.scss');


// Component for the main home dashboard of the application.
class MainDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div>
                <div className="row-fluid">
                    <EnvironmentPage />

                </div>
            </div>
        );
    }
}

export default MainDashboard;

