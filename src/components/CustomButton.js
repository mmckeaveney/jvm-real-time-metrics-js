import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';

const style = {
   color: "white",
   marginRight: 10
};
// Class to represent a simple icon button where the label and icon type can be passed as properties.
class CustomButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatButton label={this.props.label}
                        icon={<FontIcon className="material-icons" color={"white"}>{this.props.icon}</FontIcon>}
                        backgroundColor={this.props.backgroundColor ? this.props.backgroundColor : "#4527A0"}
                        hoverColor={"#B39DDB"}
                        style={style}
                        onClick={this.props.onClick}
            />
            );
    }
}

export default CustomButton;
