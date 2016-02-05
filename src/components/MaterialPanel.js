import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

class MaterialPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var styles = {
            textStyles: {
                fontSize: 30,
                color: "white"
            },
            cardStyles: {
                border: "1px solid #0097a7",
                margin: 10,
            },
            headerStyles: {
                textAlign: "center",
                border: "1px solid #0097a7",
                padding: "10px"
            }
        }

        return (
                <Card style={styles.cardStyles}
                      actAsExpander={true}
                      showExpandableButton={true}>

                    <CardHeader title={this.props.title}
                                subtitle={this.props.subtitle}
                                style={styles.headerStyles}
                                textStyle={styles.textStyles}/>
                    {this.props.children}
                </Card>
        );
    }
}

export default MaterialPanel;
