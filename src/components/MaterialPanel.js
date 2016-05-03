import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

class MaterialPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var styles = {
            textStyles: {
                fontSize: 30
            },
            cardStyles: {
                fontSize: 20,
                border: "1px solid #4527A0",
                margin: 20
            },
            headerStyles: {
                fontSize: 30,
                textAlign: "center",
                border: "1px solid #4527A0",
                padding: "10px",
                backgroundColor: "#4527A0",
            }
        }

        return (
                <Card style={styles.cardStyles} initiallyExpanded={true}>
                    <CardTitle title={<div><FontIcon className="material-icons" color={"white"}>{this.props.icon}</FontIcon> {this.props.title}</div>}
                                subtitle={this.props.subtitle}
                                style={styles.headerStyles}
                                actAsExpander={true}
                                titleColor={"white"}
                                subtitleColor={"white"}
                                showExpandableButton={true}
                                textStyle={styles.textStyles}/>
                    <CardText children={this.props.children} expandable={true}/>

                </Card>
        );
    }
}

export default MaterialPanel;
