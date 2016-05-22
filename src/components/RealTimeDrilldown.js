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
import AjaxUrl from '../utils/AjaxUrl';

@connectToStores
class RealTimeDrilldown extends React.Component {
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
        var url = `http://${AjaxUrl.url}:8090/api/settings/?userId=${profile.user_id}`;
        $.post({
            url: url,
            success: () => {
                $.post(`http://${AjaxUrl.url}:8090/user/favourites/save/?userId=${profile.user_id}`)
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
            containerId : this.props.currentApp.containerId
        });

        var actuatorMetrics = currentApp.actuatorMetrics;
        var appName = currentApp.appName;

        if (currentApp) {
            return (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <EventPanel appName={appName}/>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <ExceptionPanel appName={appName}/>
                    </div>

                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <AlertPanel appName={appName}/>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <RealTimeMetricsPanel appName={appName}
                                              actuatorMetrics={actuatorMetrics}/>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <QueryTimePanel appName={appName}/>
                    </div>
                    </div>
            );
        } else {
            return (
                <div style={{textAlign:"center"}}>
                    Application data is loading. Please wait. <br></br>
                    <CircularProgress mode="indeterminate"/>
                </div>
            );
        }
    }
}

export default RealTimeDrilldown;
