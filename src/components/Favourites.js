import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import connectToStores from 'alt/utils/connectToStores';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import Chart from "./Chart";
import MaterialPanel from './MaterialPanel';
import ClientApplicationStore from '../stores/ClientApplicationStore';
import UserStore from '../stores/UserStore';
import ClientApp from './ClientApp';
import CircularProgress from 'material-ui/lib/circular-progress';

// CSS
require('../styles/MainDashboard.scss');

@connectToStores
class Favourites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favourites: []
        }
    }

    static getStores(props) {
        return [ClientApplicationStore];
    }

    static getPropsFromStores(props) {
        return ClientApplicationStore.getState();
    }

    componentDidMount() {
        $.get(`http://localhost:8090/api/user/favourites/find/?userId=${UserStore.getState().user.user_id}`)
            .done((favourites) => {
                this.setState({
                    favourites: favourites
                });
            })
            .error((error) => {
               console.log("Error fetching favourites", error);
            });
    }

    render() {

        var favourites;
        if (this.props.clientApplications.length > 0) {
            favourites = this.props.clientApplications.map((app, index) => {
                // Filter out the favourites by ID and use them
                return (
                    <ClientApp key={index}
                               application={app}
                    >
                    </ClientApp>
                )
            })
        } else {
            favourites =  <CircularProgress/>
        }


        return (
            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7" id="article-panel-container" style={{marginTop:"10px"}}>
                <MaterialPanel title="Favourites" subtitle="Applications added to your favourites">
                    { favourites }
                </MaterialPanel>
            </div>
        );
    }
}

export default Favourites;
