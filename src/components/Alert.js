import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appName: [],
            metrics: [],
            conditions: [],
            criteria: [],
            users: []
        }
    }

    render() {
        return (
            <tr>
                <td><RaisedButton label="ReactClient" style={{margin:"5px"}} secondary={true}/></td>
                <td><RaisedButton label="CPU" style={{margin:"5px"}} secondary={true}/>
                    <RaisedButton label="HEAP" style={{margin:"5px"}} secondary={true}/></td>
                <td><RaisedButton label="DROPS BELOW" style={{margin:"5px"}} primary={true}/></td>
                <td><RaisedButton label="10000" style={{margin:"5px"}} primary={true}/></td>
                <td><RaisedButton label="Martin McKeaveney" style={{margin:"5px"}} secondary={true}/>
                    <RaisedButton label="Ryan Wilson" style={{margin:"5px"}} secondary={true}/></td>
                <td><RaisedButton label="DELETE" style={{margin:"5px"}} primary={true}/></td>
            </tr>
        );
    }
}

export default Alert;
