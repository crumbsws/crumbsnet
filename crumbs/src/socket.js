import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const url = process.env.REACT_APP_SOCKET_URL;

export const socket = io(url, {
    path: process.env.REACT_APP_SOCKET_PATH,
    transports: ["websocket"],
    withCredentials: true,
});
