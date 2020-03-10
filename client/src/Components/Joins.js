import React from 'react';
import { ListGroupItem } from 'reactstrap';

const Joins = (props) => {
	return <ListGroupItem>{props.friend} has joined the chatroom.</ListGroupItem>;
};
export default Joins;
