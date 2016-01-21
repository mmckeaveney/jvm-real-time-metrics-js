import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import WhatsNew from './WhatsNew';
import Favourites from './Favourites';
import $ from 'jquery';


// CSS
require('../styles/MainDashboard.scss');


// Component for the main home dashboard of the application.
class HomeDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
                <div className="row-fluid">
                    <WhatsNew/>
                    <Favourites/>
                </div>
        );
    }
}

export default HomeDashboard;

