import { browserHistory } from 'react-router'
import $ from 'jquery';

class AuthService {

    constructor() {
        this.lock = new Auth0Lock('879T6QmvcY1giFlYveEx2LM0Qygom43T', 'mmckeaveney.eu.auth0.com');
    }

    getLock() {
        return this.lock;
    }

    setupAjax() {
        $.ajaxSetup({
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        });
    }

    getIdToken() {
        var idToken = localStorage.getItem('userToken');
        var authHash = this.lock.parseHash(window.location.hash);
        if (!idToken && authHash) {
            if (authHash.id_token) {
                idToken = authHash.id_token
                localStorage.setItem('userToken', authHash.id_token);
            }
            if (authHash.error) {
                console.log("Error signing in", authHash);
                return null;
            }
        }
        return idToken;
    }


    logOut() {
        localStorage.removeItem("userToken");
        window.location = "/";
    }
}

export default new AuthService()