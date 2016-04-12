import React from 'react';
import { Router, Link } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { hashHistory } from 'react-router'

// CSS
require('../styles/main.scss');

class NavTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleActive(tab) {
        hashHistory.push(tab.props.route);
    }

    render() {
        var styles = {
            tabs: {
                width: '100%'
            },
            tab: {
                marginLeft: 20
            }
        };

        return <Tabs style={styles.tabs}>
            <Tab label="HOME" route="/" onActive={this.handleActive}/>
            <Tab label="ENVIRONMENT" route="/environment" onActive={this.handleActive}/>
            <Tab label="ALERTS" route="/alerts" style={styles.tab} onActive={this.handleActive}/>
            <Tab label="SETTINGS" route="/settings" onActive={this.handleActive}/>
        </Tabs>

    }
}


export default NavTabs;

