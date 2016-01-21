import React from 'react';
import { Router, Link } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import AppBar from 'material-ui/lib/app-bar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';

// CSS
require('../styles/main.scss');

// Component for the main Container Div of the application.
@ThemeDecorator(ThemeManager.getMuiTheme(DarkTheme))
class App extends React.Component {
    constructor(props) {
        super(props);
        injectTapEventPlugin();
    }

    render() {
        var myTabs = (
            <Tabs>
                <Tab label={<Link to="/">HOME</Link>} />
                <Tab label={<Link to="/environment">ENVIRONMENT</Link>} />
                <Tab label={<Link to="/alerts">ALERTS</Link>} />
                <Tab label={<Link to="/settings">SETTINGS</Link>} />
                <Tab label={<span className="glyphicon glyphicon-user" aria-hidden="true"></span>}/>
            </Tabs>
        );

        return (
        <div className="container-fluid">
            <AppBar
                title={<span>JVM Real Time Metrics System</span>}
                iconElementRight={myTabs}
            />
            {this.props.children}
        </div>);
    }
}

export default App;

