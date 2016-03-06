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
            theme: null
        }
    }

    componentDidMount() {
        //this.getSettingsForUser(this.props.appName);
    }

    saveSettingsForUser() {

        var url = "http://localhost:8090/api/events/all";
        $.post({url: url,
            success: (settings) => {
                console.log("settings saved.");
            }
        });
    }

    getSettingsForUser() {
        var url = `http://localhost:8090/api/settings?userId=${userId}`;
        $.getJSON({url: url,
            success: (settings) => {
                this.setState({
                    dockerHost: settings.dockerHost,
                    dockerPort: settings.dockerPort,
                    theme: settings.theme
                });
            }
        });
    }

    render() {

        return (
            <MaterialPanel title={ `Settings for User getUserNameHere`}>
                <TextField
                    hintText="Docker Host"
                    floatingLabelText="Enter your docker host url."
                /><br/>
                <TextField
                    hintText="Docker Port "
                    floatingLabelText="Enter your docker host port."
                /><br/>
                <SelectField value={this.state.value} floatingLabelText="Choose your theme.">
                    { items }
                </SelectField>
                <RaisedButton label="Save" secondary={true} onClick={this.saveSettingsForUser()} />
            </MaterialPanel>
        );
    }
}

export default Settings;
