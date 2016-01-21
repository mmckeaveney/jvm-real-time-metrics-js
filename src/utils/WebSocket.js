import SockJS from 'sockjs-client';
var Stomp = require('stompjs/lib/stomp');

class WebSocket {

    static register(registrations) {
        var socket = SockJS('/metricspoll');
        var stompClient = Stomp.Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            registrations.forEach(function (registration) {
                stompClient.subscribe(registration.route, registration.callback);
            });
        });
    }
}

export default WebSocket;

