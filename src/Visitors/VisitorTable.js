import React, { Component } from 'react';
import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-timezone';
import { Table } from 'reactstrap';
import NewIcon from '../Utils/NewIcon';

class VisitorTable extends Component {


	toggleTruncate(e) {
		if(e.target.classList.contains("text-truncate")) {
			e.target.classList.remove("text-truncate");
		} else {
			e.target.classList.add("text-truncate");
		}
	}

	render() {

	   	const rows = this.props.rows;
		const logs = [].concat(rows)
    	//.sort((a, b) => moment(a.ReceivedAt).isBefore(b.ReceivedAt) ? 1 : -1)
    	//.sort((a, b) => a.ID < b.ID)
    	.map((v,k) =>{

    		let diff = moment().diff(moment(v.visit_date),'minutes');
    		let flagnew = diff < 90 ? <span className="mr-3"><NewIcon /></span> : null;
	   		return (
	   			<tr id={'log_'+v._id} key={v._id}>
	            	<td>{flagnew}<Moment format="M/D/YY HH:mm a">{v.visit_date}</Moment></td>
	            	<td>{v.http_status}</td>
	            	<td>{v.ip}</td>
	            	<td>{v.method}</td>
	            	<td>{v.url}</td>
	            	<td>{v.referer}</td>
	            	<td className="text-truncate" style={{maxWidth : '40vw', cursor : 'default'}} onClick={this.toggleTruncate.bind(this)}>{ v.agent }</td>
	            </tr>
	   		);
	   	});
	   	let colstyle = { 'minWidth' : '140px' };
	   	return (
   			<Table className='table-bordered table-sm table-condensed m-0'>
				<thead className="bg-light">
					<tr><th>Date</th><th>Status</th><th>IP</th><th>Method</th><th>Url</th><th>Referer</th><th style={colstyle}>Agent</th></tr>
				</thead>
				<tbody className="small">
					{logs}
				</tbody>
			</Table>
	   	);

	}

}

export default VisitorTable;