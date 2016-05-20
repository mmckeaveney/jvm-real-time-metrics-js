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
import _ from 'underscore';
import AjaxUrl from '../utils/AjaxUrl';

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

    componentWillMount() {
        var user = JSON.parse(localStorage.getItem("userProfile"));
        $.get(`http://${AjaxUrl.url}:8090/api/user/favourites/find/?userId=${user.user_id}`)
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
        // If there are any client applications available
        if (this.props.clientApplications.length > 0 && this.state.favourites.length > 0) {
            // Filter the favourites by containerId
            var filtered = _.filter(this.props.clientApplications, (app) => {
                     return _.contains(this.state.favourites, app.containerId);
                });
            // Render the favourites on the page.
            favourites = filtered.map((app, index) => {
                return (
                    <ClientApp key={index}
                               application={app}
                    >
                    </ClientApp>
                )
            })
        } else {
            favourites = <div> No Favourites Saved For user.</div>
        }


        return (
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" id="article-panel-container" style={{marginTop:"10px"}}>
                <MaterialPanel title="Favourites" subtitle="Applications added to your favourites" icon="star">
                    { favourites }
                </MaterialPanel>
            </div>
        );
    }
}

export default Favourites;
