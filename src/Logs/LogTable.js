import React, { Component } from 'react';
import Moment from 'react-moment';
import * as moment from 'moment';
import 'moment-timezone';
import { Table } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import NewIcon from '../Utils/NewIcon';


class LogTable extends Component {


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
    	.sort((a, b) => a.ID < b.ID)
    	.map((v,k) =>{
    		let facility = v.Facility !== "" && v.Facility !== null ? parseInt(v.Facility,10) : 100;
    		let priority = v.Priority !== "" && v.Priority !== null ? parseInt(v.Priority,10) : 100;
    		let rowclass="";
    		let priority_icon , facility_icon;
    		switch (true) {
    			case (priority < 4):
    				rowclass = 'bg-danger text-white';
					priority_icon = (<FontAwesomeIcon icon="times-circle" />)
	    			break;
	    		case (priority === 4):
	    			rowclass = 'bg-caution text-dark';
	    			priority_icon = (<FontAwesomeIcon icon="exclamation-triangle" />);
	    			break;
	    		case (priority === 5 || priority === 6):
	    			priority_icon = (<FontAwesomeIcon icon="info-circle" />);
	    			break;
	    		case (priority === 7):
	    			priority_icon = (<FontAwesomeIcon icon="bug" />);
	    			break;
	    		default:
	    			break;
    		}
    		switch (true) {
    			case ( facility === 0 && /.*IN.*OUT.*SRC.*DST.*/.test(v.Message) ) :
					facility_icon = (<FontAwesomeIcon icon="fire" className="text-danger" />)
	    			break;
	    		case (facility === 4 || facility === 10):
	    			facility_icon = (<FontAwesomeIcon icon="key" />);
	    			break;
	    		case (facility === 2):
					facility_icon = (<FontAwesomeIcon icon="envelope" />);
	    			break;
	    		case (v.SysLogTag === 'chef-client:'):
				facility_icon = (<FontAwesomeIcon icon="utensils" />);
	    			break;
	    		default:
	    			break;
    		}
    		let diff = moment().diff(moment(v.ReceivedAt),'minutes');
    		let flagnew = diff < 90 ? <span className="mr-3"><NewIcon dark={priority < 4} /></span> : null;
	   		return (
	   			<tr id={'log_'+v.ID} key={v.ID} className={rowclass}>
	   				<td>{facility_icon || null}</td>
	   				<td>{priority_icon || null}</td>
	            	<td>{flagnew}<Moment format="M/D/YY HH:mm a">{v.ReceivedAt}</Moment></td>
	            	<td>{v.FromHost}</td>
	            	<td>{v.SysLogTag}</td>
	            	<td><Moment format="M/D/YY HH:mm a z">{v.DeviceReportedTime}</Moment></td>
	            	<td className="text-truncate" style={{maxWidth : '40vw', cursor : 'default'}} onClick={this.toggleTruncate.bind(this)}>{ v.Message }</td>
	            </tr>
	   		);
	   	});
	   	let colstyle = { 'minWidth' : '140px' };
	   	return (
   			<Table className='table-bordered table-sm table-condensed m-0'>
				<thead className="bg-light">
					<tr><th></th><th></th><th style={colstyle}>Received</th><th>From</th><th>Tag</th><th style={colstyle}>At</th><th style={colstyle}>Message</th></tr>
				</thead>
				<tbody className="small">
					{logs}
				</tbody>
			</Table>
	   	);

	}

}

export default LogTable;