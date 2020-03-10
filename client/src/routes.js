import Lobby from './Components/Lobby';
import Chatroom from './Components/Chatroom';
import Chat from './api/ChatApi';
import SocketE from './api/SocketApi';
import Room from './api/RoomApi';
// import LiveVisitors from './Components/LiveVisitors';

export default [
	{ path: '/', exact: true, Component: Lobby },
	{ path: '/chatroom', Component: Chatroom },
	{ path: '/api/history', Component: Chat },
	{ path: '/api/eventlog', Component: SocketE },
	{ path: '/api/roomhistory', Component: Room }
];
