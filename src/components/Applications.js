import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';
import ClientApp from './ClientApp';
import WebSocket from '../utils/WebSocket';



// CSS
require('../styles/MainDashboard.scss');


class Applications extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var websocket = new WebSocket();
        websocket.register({
            route: '/jvmrt/metricsUpdate', callback: this.updateUi
        });
    }

    updateUi(message) {
       console.log("Trying websocket here.");
       console.log(message);
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="article-panel-container"
                 style={{marginTop:"10px"}}>

                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title" style={{fontSize: "25px"}}>Environment Applications</h3>
                    </div>
                    <div className="panel-body">
                        <ClientApp title={"JVClient"}
                                   content={"content"}
                                   footer={"footer"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Applications;
