import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import FlatButton from 'material-ui/lib/flat-button';
import AppActions from '../actions/AppActions';
import ClientApp from './ClientApp';
import WebSocket from '../utils/WebSocket';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import MaterialPanel from './MaterialPanel';
import CircularProgress from 'material-ui/lib/circular-progress';


// CSS
require('../styles/MainDashboard.scss');

@connectToStores
class ClientApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientApplications: null
        }
    }

    componentDidMount() {
        WebSocket.register([{
            route: '/jvmrt/metricsUpdate',
            callback: AppActions.updateLatestApplicationMetadata
        }], "/metricspoll");
    }

    static getStores(props) {
        return [ClientApplicationStore];
    }

    static getPropsFromStores(props) {
        return ClientApplicationStore.getState();
    }

    render() {
        var clientApps;

        if (this.props.clientApplications.length > 0) {
            clientApps = this.props.clientApplications.map((app, index) => {
                return (
                    <ClientApp key={index}
                               title={app.appName}
                               content={app.actuatorMetrics}
                               containerId={app.containerId}
                               >
                    </ClientApp>
                )
            })
        } else {
            clientApps =  <CircularProgress/>
        }

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="client-application-container"
                 style={{marginTop:"10px"}}>
                <MaterialPanel title="Environment Applications"
                               subtitle="All the current applications running in your environment">
                    {clientApps}
                </MaterialPanel>

            </div>
        );
    }
}

export default ClientApplications;
