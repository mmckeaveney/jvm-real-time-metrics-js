import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
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
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

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
                <MaterialPanel title={`Environment Summary `} icon="apps" >
                        <List>
                            <ListItem insetChildren={true} primaryText={`Number of apps in environment : ${this.props.clientApplications.length}`} />
                            <ListItem insetChildren={true} primaryText={`Most Problematic Application (Most Exceptions): `} />
                        </List>
                        <EventPanel appName={appName}/>

                        <ExceptionPanel appName={appName}/>

                        <AlertPanel appName={appName}/>

                        <QueryTimePanel appName={appName}/>

                </MaterialPanel>
        );
    }
}

export default EnvironmentInfo;
