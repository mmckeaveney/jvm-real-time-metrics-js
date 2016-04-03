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
        return (
            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7" id="article-panel-container" style={{marginTop:"10px"}}>
                <MaterialPanel title="Favourites" subtitle="Applications added to your favourites">

                </MaterialPanel>
            </div>
        );
    }
}

export default Favourites;
