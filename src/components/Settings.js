import React from 'react';
import _ from 'underscore';
import MaterialPanel from './MaterialPanel';
import TextField from 'material-ui/lib/text-field';
import Actions from '../actions/AppActions';
import CircularProgress from 'material-ui/lib/circular-progress';
import $ from 'jquery';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings:{}
        }
    }

    componentDidMount() {
        //this.getSettingsForUser(this.props.appName);
    }

    getSettingsForUser(criteria) {
        var url = "http://localhost:8090/api/events/all";
        $.getJSON({url: url,
            success: (settings) => {
                this.setState({
                    settings: settings
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
                <SelectField value="Select Theme">
                    <MenuItem value={"someVal"} primaryText="Light Theme"/>
                    <MenuItem value={"someVal1"} primaryText="Dark Theme"/>
                </SelectField>
            </MaterialPanel>
        );
    }
}

export default Settings;
