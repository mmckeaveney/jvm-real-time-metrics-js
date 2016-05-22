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
import CustomButton from './CustomButton';
import FlatButton from 'material-ui/lib/flat-button';
import AuthService from '../utils/AuthService';
import UserStore from '../stores/UserStore';
import Stepper from 'material-ui/lib/Stepper/Stepper';
import Step from 'material-ui/lib/Stepper/VerticalStep';
import FontIcon from 'material-ui/lib/font-icon';
import connectToStores from 'alt/utils/connectToStores';
import AjaxUrl from '../utils/AjaxUrl';

const items = [
    <MenuItem key={1} value={1} primaryText="Light Theme"/>,
    <MenuItem key={2} value={2} primaryText="Dark Theme"/>,
];

@connectToStores
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            dockerHost: null,
            dockerPort: null,
            theme: null,
            userId: null,
            username: null,
            activeStep: -1,
            statusSteps: []
        }
    }

    static getStores(props) {
        return [UserStore];
    }

    static getPropsFromStores(props) {
        return UserStore.getState();
    }

    componentWillMount() {
        this.getSettings();
    }

    selectStep(CurrentStep) {
        this.setState({
            activeStep: CurrentStep,
        });
    }

    updateCompletedSteps(CurrentStep) {
        return this.state.statusSteps[CurrentStep];
    }

    createIcon(step) {
        if (step.props.isCompleted) {
            return (
                <FontIcon className="material-icons" style={{fontSize: 14}}>
                    done
                </FontIcon>
            );
        }

        return <span>{step.props.orderStepLabel}</span>;
    }

    continue() {
        const {
            activeStep,
            statusSteps,
            } = this.state;

        statusSteps[activeStep] = true;

        this.setState({
            activeStep: activeStep + 1,
            statusSteps: statusSteps,
        });
    }


    updateCompletedSteps(currentStep) {
        return currentStep < this.state.lastActiveStep;
    }

    saveSettings() {
        var url = `http://${AjaxUrl.url}:8090/api/settings/save`;
        var snackBar = this.refs.settingsSaved;
        $.ajax({
            url: url,
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                dockerHost: this.state.dockerHost,
                dockerPort: this.state.dockerPort
            }),
            dataType: 'json',
            success: (alert) => {
                console.log("settings saved.");
                console.log(alert)
                AppActions.openSnackbar("Settings Saved.");
            },
            error: (error) => {
                console.log("error when saving settings", error);
            }
        });
    }

    getSettings() {
        var profile = this.props.user;
        var url = `http://${AjaxUrl.url}:8090/api/settings`;
        $.get({
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
            <MaterialPanel title={ `Settings for user ${this.state.username}`} icon="build">
                <Stepper activeStep={this.state.activeStep} onStepHeaderTouch={this.selectStep.bind(this)}
                    updateCompletedStatus={this.updateCompletedSteps.bind(this, this.props)}
                    createIcon={this.createIcon}
                >
                    <Step orderStepLabel="1" stepLabel="Select Docker Host.">
                        <TextField ref="dockerHost" value={this.state.dockerHost}
                            floatingLabelText="Enter your docker host url."
                            onChange={this.handleDockerHost}
                        />
                    </Step>
                    <Step orderStepLabel="2" stepLabel="Select Docker Port.">
                        <TextField ref="dockerPort" value={this.state.dockerPort}
                                   floatingLabelText="Enter your docker host port."
                                   onChange={this.handleDockerPort}
                        />
                    </Step>

                    <Step orderStepLabel="3" stepLabel="Save Settings" actions={[
                    <CustomButton label="Save"
                                  icon="add"
                                  onClick={this.saveSettings.bind(this, this.props)}/>
                    ]}>
                        You're all done. Click save to save your settings.
                    </Step>
                </Stepper>
            </MaterialPanel>
        );
    }
}

export default Settings;
