import React from 'react';
import { hashHistory } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Chart from './Chart';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import UserStore from '../stores/UserStore';
import _ from 'underscore';
import RealTimeMetricsPanel from './RealTimeMetricsPanel';
import AppActions from '../actions/AppActions';
import MaterialPanel from './MaterialPanel';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CardActions from 'material-ui/Card/CardActions';
import EventPanel from './EventPanel';
import ExceptionPanel from './ExceptionPanel';
import QueryTimePanel from './QueryTimePanel';
import AlertPanel from './AlertPanel';
import AuthService from '../utils/AuthService';

@connectToStores
class ClientAppDrilldown extends React.Component {
    constructor(props) {
        super(props);
    }

    static getStores(props) {
        return [ClientApplicationStore];
    }

    static getPropsFromStores(props) {
        return ClientApplicationStore.getState();
    }

    addToFavourites() {
            var profile = UserStore.getState().user;
            var url = `http://localhost:8090/api/settings/?userId=${profile.user_id}`;
            $.post({
                url: url,
                success: () => {
                    $.post(`http://localhost:8090/user/favourites/save/?userId=${profile.user_id}`)
                        .done(function () {
                            console.log("Saved Favourite Successfully.");
                        })
                        .fail(function () {
                            console.log("Error when saving favourite ", error);
                        });
                }
            });
    }

    goBack() {
        hashHistory.push("/environment");
    }

    render() {
            var currentApp = _.findWhere(ClientApplicationStore.getState().clientApplications, {
                containerId : this.props.params.containerId
            })

        var actuatorMetrics = currentApp.actuatorMetrics;
        var appName = currentApp.appName;

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <MaterialPanel title={`${appName} Details `}
                               subtitle={
                               <FlatButton label="Back" labelPosition="after" primary={true} onClick={this.goBack.bind(this, this.props)}
                                  icon={<ArrowBack />
                               } />
                }>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <EventPanel appName={appName}/>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <ExceptionPanel appName={appName}/>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <AlertPanel appName={appName}/>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <RealTimeMetricsPanel appName={appName}
                                          actuatorMetrics={actuatorMetrics}/>
                        </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <QueryTimePanel appName={appName}/>
                    </div>
                    <Chart appName={appName}/>
                    <CardActions>
                        <RaisedButton label="Add to Favourites" secondary={true} onClick={this.addToFavourites.bind(this, this.props)}/>
                    </CardActions>
                </MaterialPanel>
            </div>
        );
    }
}

export default ClientAppDrilldown;
