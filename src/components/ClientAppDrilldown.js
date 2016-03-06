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
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import CardActions from 'material-ui/lib/card/card-actions';
import EventPanel from './EventPanel';
import ExceptionPanel from './ExceptionPanel';

class ClientAppDrilldown extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

            // TODO: This is a routing hack, fix it
            var currentApp = _.findWhere(ClientApplicationStore.getState().clientApplications, {
                appName : `frankblizzard/${this.props.params.image}`
            })

        var actuatorMetrics = currentApp.actuatorMetrics;
        var appName = currentApp.appName;

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
                <MaterialPanel title={`${appName} Details `}
                               subtitle={
                               <Link to="/environment">
                               GO BACK
                                   <IconButton> <ArrowBack/> </IconButton>
                               </Link>
                                }>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                        <EventPanel appName={appName}/>
                    </div>

                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                        <ExceptionPanel appName={appName}/>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">{appName} Alerts</h3>
                            </div>
                            <div className="panel-body">
                               /* <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>Event</th>
                                        <th>Type</th>
                                        <th>Time</th>
                                    </tr>
                                    <tr>
                                        <td>Updated to version 1.1</td>
                                        <td>Update/Release</td>
                                        <td>1 hour ago</td>
                                        <td><RaisedButton label="See Alert" style={{margin:"5px"}} secondary={true}/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table> */
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <RealTimeMetricsPanel appName={appName}
                                          actuatorMetrics={actuatorMetrics}/>
                        </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">{appName} Query Times</h3>
                            </div>
                            <div className="panel-body">
                               /* <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>Query Method</th>
                                        <th>Class</th>
                                        <th>Execution Time</th>
                                        <th>How Long Ago</th>
                                    </tr>
                                    <tr>
                                        <td>updateUserCredentials()</td>
                                        <td>UserDaoImpl</td>
                                        <td>200ms</td>
                                        <td>10 minutes ago</td>
                                    </tr>
                                    </tbody>
                                </table> */
                            </div>
                        </div>
                    </div>
                    <Chart appName={appName}/>
                    <CardActions>
                        <RaisedButton label="Add to Favourites" secondary={true}/>
                    </CardActions>
                </MaterialPanel>
            </div>
        );
    }
}

export default ClientAppDrilldown;
