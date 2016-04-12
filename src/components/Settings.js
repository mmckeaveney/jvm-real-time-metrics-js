import React from 'react';
import _ from 'underscore';
import MaterialPanel from './MaterialPanel';
import TextField from 'material-ui/lib/text-field';
import Actions from '../actions/AppActions';
import CircularProgress from 'material-ui/lib/circular-progress';
import $ from 'jquery';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AuthService from '../utils/AuthService';

const items = [
    <MenuItem key={1} value={1} primaryText="Light Theme"/>,
    <MenuItem key={2} value={2} primaryText="Dark Theme"/>,
];

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            dockerHost: null,
            dockerPort: null,
            theme: null,
            userId: null,
            username: null
        }
    }

    componentWillMount() {
        this.getSettingsForUser();
    }

    saveSettingsForUser() {
        var url = `http://localhost:8090/api/settings/save/?userId=${this.state.userId}`;
        $.post({
            url: url,
            data: {
                dockerHost: this.state.dockerHost,
                dockerPort: this.state.dockerPort
            },
            success: (settings) => {
                console.log("settings saved.");
            }
        });
    }

    getSettingsForUser() {
        var profile = localStorage.getItem("userProfile");
        var url = `http://localhost:8090/api/settings/?userId=${profile.user_id}`;
        $.post({
            url: url,
            success: (settings) => {
                this.setState({
                    dockerHost: settings.dockerHost,
                    dockerPort: settings.dockerPort,
                    userId: profile.user_id,
                    username: profile.nickname
                });
            }
        });

    }

    handleDockerHost = (event) => {
        this.setState({
            dockerHost: event.target.value
        });
    };

    handleDockerPort = (event) => {
        this.setState({
            dockerPort: event.target.value
        });
    };

    render() {
        return (
            <MaterialPanel title={ `Settings for User ${this.state.username}`}>
                <TextField
                    ref="dockerHost"
                    value={this.state.dockerHost}
                    floatingLabelText="Enter your docker host url."
                    onChange={this.handleDockerHost}
                /><br/>
                <TextField
                    ref="dockerPort"
                    value={this.state.dockerPort}
                    floatingLabelText="Enter your docker host port."
                    onChange={this.handleDockerPort}
                /><br/>
                <SelectField value={this.state.value} floatingLabelText="Choose your theme.">
                    { items }
                </SelectField>
                <RaisedButton label="Save" secondary={true} onMouseDown={this.saveSettingsForUser}/>
            </MaterialPanel>
        );
    }
}

export default Settings;
