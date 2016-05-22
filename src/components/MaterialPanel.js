import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import FontIcon from 'material-ui/lib/font-icon';

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
                    <CardText children={this.props.children} expandable={true} style={this.props.style}/>

                </Card>
        );
    }
}

export default MaterialPanel;
