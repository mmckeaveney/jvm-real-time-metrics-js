import { hashHistory } from 'react-router'
import $ from 'jquery';

class AuthService {

    constructor() {
    }

    /**
     * Sets up ajax calls to the API so that they can be authenticated by spring security.
     * Passes a token to the server.
     */
    setupAjax() {
        $.ajaxSetup({
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        });
    }

    logOut() {
        localStorage.removeItem("userToken");
        window.location = "/";
    }
}

export default new AuthService()