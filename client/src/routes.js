import Lobby from './Components/Lobby';
import Chatroom from './Components/Chatroom';
import Chat from './Components/ChatApi';
// import LiveVisitors from './Components/LiveVisitors';

export default [
	{ path: '/', exact: true, Component: Lobby },
	{ path: '/chatroom', Component: Chatroom },
	{ path: '/chat', Component: Chat }
];
