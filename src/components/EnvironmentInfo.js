import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import Chart from './Chart';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import _ from 'underscore';
import RealTimeMetricsPanel from './RealTimeMetricsPanel';
import AppActions from '../actions/AppActions';
import MaterialPanel from './MaterialPanel';
import EventPanel from './EventPanel';
import ExceptionPanel from './ExceptionPanel';
import AlertPanel from './AlertPanel';
import QueryTimePanel from './QueryTimePanel';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

@connectToStores
class EnvironmentInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    static getStores(props) {
        return [ClientApplicationStore];
    }

    static getPropsFromStores(props) {
        return ClientApplicationStore.getState();
    }

    render() {
        var appName = "mostRecent";
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <MaterialPanel title={`About your Environment `} >
                        <List>
                            <ListItem insetChildren={true} primaryText={`Number of apps in environment : ${this.props.clientApplications.length}`} />
                            <ListItem insetChildren={true} primaryText={`Most Problematic Application (Most Exceptions): `} />
                        </List>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <EventPanel appName={appName}/>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <ExceptionPanel appName={appName}/>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <AlertPanel appName={appName}/>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <QueryTimePanel appName={appName}/>
                    </div>

                </MaterialPanel>
            </div>
        );
    }
}

export default EnvironmentInfo;
