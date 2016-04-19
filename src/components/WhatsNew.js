import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import MaterialPanel from './MaterialPanel';
import EventPanel from './EventPanel';
import ExceptionPanel from './ExceptionPanel';
import AlertPanel from './AlertPanel';
import QueryTimePanel from './QueryTimePanel';

// CSS
require('../styles/MainDashboard.scss');


class WhatsNew extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5" id="whats-new" style={{marginTop:"10px"}}>
                <MaterialPanel title="Latest" subtitle="The Latest From Your Environment" icon="whatshot">

                    <EventPanel appName="All"/>

                    <ExceptionPanel appName="All"/>

                    <AlertPanel appName="All"/>

                    <QueryTimePanel appName="All"/>
            </MaterialPanel>
        </div> );
    }
}

export default WhatsNew;
