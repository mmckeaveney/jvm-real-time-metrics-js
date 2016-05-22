import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

class WebSocket {

    static register(registrations, endpoint) {
        var socket = SockJS(endpoint);
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            registrations.forEach(function (registration) {
                stompClient.subscribe(registration.route, registration.callback);
            });
        });
    }
}

export default WebSocket;

