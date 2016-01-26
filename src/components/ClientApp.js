import React from 'react';
import { Link } from 'react-router';
import AppActions from '../actions/AppActions';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import Chart from './Chart';
import _ from 'underscore';

// CSS
require('../styles/MainDashboard.scss');


class ClientApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : null,
            actuatorMetrics : null
        }
    }

    render() {
        var styles = {
            fontWeight: "bold",
            textAlign: "center"
        }




        return (
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <div className="panel panel-primary" style={styles}>
                            <div className="panel-heading">{this.props.title}</div>
                            <div className="panel-body">
                                <table className="table" >
                                    <tbody>
                                    <tr>
                                        <th>Events</th>
                                        <th>Exceptions</th>
                                        <th>Alerts</th>
                                    </tr>
                                    <tr>
                                        <td>TO BE IMPLEMENTED</td>
                                        <td>TO BE IMPLEMENTED</td>
                                        <td>TO BE IMPLEMENTED</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Chart appName={this.props.title}/>
                            </div>
                        <div className="panel-footer">
                            <RaisedButton label="More Details"
                                          containerElement={<Link to={`/appdetail/${this.props.index}`}/> }
                                          linkButton={true}
                                          style={{margin:"5px"}}
                                          secondary={true} />
                                <RaisedButton label="Add to Favourites" secondary={true} /></div>
                        </div>
                </div>
        );
    }
}

export default ClientApp;
