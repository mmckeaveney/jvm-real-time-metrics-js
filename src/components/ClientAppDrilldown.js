import React from 'react';
import { hashHistory } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import CustomButton from './CustomButton';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import Chart from './Chart';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import UserStore from '../stores/UserStore';
import _ from 'underscore';
import RealTimeMetricsPanel from './RealTimeMetricsPanel';
import AppActions from '../actions/AppActions';
import MaterialPanel from './MaterialPanel';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import CardActions from 'material-ui/lib/card/card-actions';
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
                               <CustomButton label="Back"
                                      backgroundColor="#000000"
                                      onClick={this.goBack.bind(this, this.props)}
                                      icon="arrow_back" />
                }>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <EventPanel appName={appName}/>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <ExceptionPanel appName={appName}/>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <AlertPanel appName={appName}/>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <RealTimeMetricsPanel appName={appName}
                                          actuatorMetrics={actuatorMetrics}/>
                        </div>

                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
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
