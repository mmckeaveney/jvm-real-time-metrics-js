import React from 'react';
import { hashHistory } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import CustomButton from './CustomButton';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import Chart from './Chart';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import UserStore from '../stores/UserStore';
import _ from 'underscore';
import RealTimeMetricsPanel from './RealTimeMetricsPanel';
import AppActions from '../actions/AppActions';
import MaterialPanel from './MaterialPanel';
import RealTimeDrilldown from './RealTimeDrilldown';

class ClientAppDrilldown extends React.Component {
    constructor(props) {
        super(props);
    }

    goBack() {
        hashHistory.push("/environment");
    }

    render() {
        var currentApp = _.findWhere(ClientApplicationStore.getState().clientApplications, {
                containerId : this.props.params.containerId
            });

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <MaterialPanel title={`${currentApp.appName} Details `}
                               subtitle={
                               <CustomButton label="Back"
                                      backgroundColor="#000000"
                                      onClick={this.goBack.bind(this, this.props)}
                                      icon="arrow_back" />
                }>
                <RealTimeDrilldown currentApp={currentApp}/>
                </MaterialPanel>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <MaterialPanel title={`${currentApp.appName} TimeSeries Metrics`}>
                    <Chart appName={currentApp.appName}/>
                </MaterialPanel>
                </div>
            </div>
        );
    }
}

export default ClientAppDrilldown;
