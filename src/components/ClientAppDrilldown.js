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

    render() {


        var actuatorMetrics = this.props.clientApplications[this.props.params.id].actuatorMetrics;
        var appName = this.props.clientApplications[this.props.params.id].appName;

        var actuatorMarkup = _.map(actuatorMetrics, (value, key) => {
            return (
                <tr>
                    <td> {key} </td>
                    <td> {value} </td>
                </tr>
            )
        });

        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <Link to="/environment">
                            <IconButton> <ArrowBack/> </IconButton>
                        </Link>
                        {appName} Details
                    </div>
                    <div className="panel-body">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">{appName} Events</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>Event</th>
                                        <th>Type</th>
                                        <th>Time</th>
                                    </tr>
                                    <tr>
                                        <td>Updated to version 1.1 </td>
                                        <td>Update/Release</td>
                                        <td>1 hour ago</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>

                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">{appName} Exceptions</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>Exception</th>
                                        <th>Time</th>
                                    </tr>
                                    <tr>
                                        <td>SQLException</td>
                                        <td>1 hour ago</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">{appName} Alerts</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>Event</th>
                                        <th>Type</th>
                                        <th>Time</th>
                                    </tr>
                                    <tr>
                                        <td>Updated to version 1.1 </td>
                                        <td>Update/Release</td>
                                        <td>1 hour ago</td>
                                        <td><RaisedButton label="See Alert" style={{margin:"5px"}} secondary={true} /></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>

                            <RealTimeMetricsPanel appName={appName}
                                                  actuatorMetrics={actuatorMetrics}/>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{appName} Query Times</h3>
                                </div>
                                <div className="panel-body">
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <th>Query Method</th>
                                            <th>Class</th>
                                            <th>Execution Time</th>
                                            <th>How Long Ago</th>
                                        </tr>
                                        <tr>
                                            <td>updateUserCredentials() </td>
                                            <td>UserDaoImpl</td>
                                            <td>200ms</td>
                                            <td>10 minutes ago</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Chart appName={appName}/>
                    </div>
                    <div className="panel-footer">
                        <RaisedButton label="Add to Favourites" secondary={true} /></div>
                </div>
            </div>
        );
    }
}

export default ClientAppDrilldown;
