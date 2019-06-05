import React, { Component } from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Clock from '../Utils/Clock';


class Footer extends Component {

	render() {
		const d = moment(); 
		let y = d.format('YYYY');
		let a = moment().format('h:mm a');
		let reload = () => document.location.reload();

		return (
			<footer className="nav-footer ncblue-bg text-white" id="footer">
				<Container fluid>
					<Row>
						<Col><FontAwesomeIcon icon='sync' onClick={reload} /> Fresh at { a } - It is now <Clock format='MMMM Do YYYY h:mm:ss a' /></Col>
						<Col className="text-right mr-5 pr-5"><span className="d-none d-md-inline">JRT - NC DPH</span> &copy;{ y }</Col>
					</Row>
				</Container>
			</footer>
		);
	}

}

export default Footer;