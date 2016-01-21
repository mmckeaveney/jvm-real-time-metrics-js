import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import FlatButton from 'material-ui/lib/flat-button';
import AppActions from '../actions/AppActions';
import ClientApp from './ClientApp';
import WebSocket from '../utils/WebSocket';
import ClientApplicationStore from '../stores/ClientApplicationStore';

// CSS
require('../styles/MainDashboard.scss');

@connectToStores
class ClientApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientApplications: []
        }
    }

    componentDidMount() {
        WebSocket.register([{
            route: '/jvmrt/metricsUpdate', callback: AppActions.updateLatestApplicationMetadata
        }]);
    }

    static getStores(props) {
        return [ClientApplicationStore];
    }

    static getPropsFromStores(props) {
        return ClientApplicationStore.getState();
    }

    render() {
        var clientApps;

        if (this.props.clientApplications) {
            clientApps = this.props.clientApplications.map((app, index) => {
                return (
                    <ClientApp key={index}
                               title={app.appName}
                               content={app.actuatorMetrics}
                               index={index}>
                    </ClientApp>
                )
            })
        } else {
            clientApps =  <span> No docker client applications currently available. </span>
        }

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="client-application-container"
                 style={{marginTop:"10px"}}>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title" style={{fontSize: "25px"}}>Environment Applications</h3>
                    </div>
                    <div className="panel-body">
                        {clientApps}
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientApplications;
