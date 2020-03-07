import Lobby from './Components/Lobby';
import Chatroom from './Components/Chatroom';
// import LiveVisitors from './Components/LiveVisitors';

export default [
	{ path: '/', exact: true, Component: Lobby },
	{ path: '/chatroom', Component: Chatroom }
	// { path: '/liveVisitors', exact: true, Component: LiveVisitors }
];
