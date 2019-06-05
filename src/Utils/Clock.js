import React, { Component } from 'react';
import moment from 'moment';

class Clock extends Component {

	constructor(props) {
		super(props);
		this.tick = this.tick.bind(this);
		this.state = { clock: moment().format(this.props.format) }
	}

	componentDidMount() {
		setInterval(this.tick,1000)	
	}

	componentWillUnmount() {
		clearInterval(this.tick);
	}

	tick() {
		this.setState({clock : (moment().format(this.props.format))});
	}

	render() {
		let t = this.state.clock;	
		return (<span>{t}</span>);
	}

}

export default Clock;