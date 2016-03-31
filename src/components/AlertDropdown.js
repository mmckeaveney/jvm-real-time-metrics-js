import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';


class AlertDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    componentWillMount() {

    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        var items = this.props.data.map((item, index) => {
            return <MenuItem key={index} value={index} primaryText={item}/>
        });

        return (
            <SelectField value={this.state.value}
                         onChange={this.handleChange}>
                { items }
            </SelectField>
        );
    }
}

export default AlertDropdown;
