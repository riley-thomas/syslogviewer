import React, { Component } from 'react';
//import Moment from 'react-moment';
//import 'moment-timezone';
import { Container, Card, CardBody, Badge, Row, Col, Alert } from 'reactstrap';
import DataFetcher from '../Utils/DataFetcher';
import LogTable from './LogTable';
import Paginator from '../Utils/Paginator';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Cookies from 'universal-cookie';
import * as moment from 'moment';
import Menu from '../Utils/Menu';
import BlueDiv from '../Utils/BlueDiv';

class LogPage extends Component {

	constructor(props) {
		super(props);
		this.cookies = new Cookies();
		let cookiename = 'filters_open';
		let open = this.cookies.get(cookiename) === 'open' ? 'open' : 'closed';
		let logcookie = this.cookies.get('logfilters') || {};
		this.state = {
			page: this.props.route.match.params.page,
			working: true,
			fetching: false,
			data : null,
			cookiename : cookiename,
			expanded: open,
			priorityFilter : logcookie.priorityFilter || Array(8).fill(''),
			messageFilter : logcookie.messageFilter || '',
			hostFilter : logcookie.hostFilter || '',
			tagFilter : logcookie.tagFilter || '',
			error : null
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.props.page !== nextProps.page) this.setState({page: nextProps.page}, ()=> this.getLogs());
	}

	componentWillMount() {
		this.getLogs();
	}

	updateLogCookie() {
		this.cookies.set('logfilters', 
			{
				priorityFilter : this.state.priorityFilter,
				messageFilter : this.state.messageFilter,
				hostFilter: this.state.hostFilter,
				tagFilter : this.state.tagFilter
			},{
				path : '/',
				expires : moment().add(365, 'days').toDate() 
			}
		);
	}

	getLogs() {
		this.setState({fetching : true});
		DataFetcher({type:'logs', id: this.state.page, priority: this.state.priorityFilter, message : this.state.messageFilter, host : this.state.hostFilter, tag : this.state.tagFilter}).then( (logs) => {
            this.setState({data : logs});
        	this.stopWorking();
        })
        .catch((e)=> { 
        	this.setState({error : (e.request.status || 'Unknown') + ' Error : '+(e.request.statusText || '')}, ()=> { this.stopWorking();console.error(e)}) 
        });
	}

	renderRows() {
		if(this.state.fetching){
			return <div className="text-center m-2"><FontAwesomeIcon icon="spinner" size="4x" spin pulse /></div>
		}
		return <LogTable rows={this.state.data.data} />;
	}

	renderPaginator() {
		return <Paginator base="" pagecount={this.state.data.last_page} currentpage={this.state.data.current_page} />
	}

	stopWorking() {
		this.setState({working:false, fetching: false});
	}

	expand() {
		let open = this.state.expanded === 'open' ? 'closed' : 'open';
		this.setState({expanded : open}, ()=>{
			this.cookies.set(this.state.cookiename, open, { path : '/', expires : moment().add(365, 'days').toDate() })
		})
	}

	updateMessageFilter(e) {
		this.setState({ messageFilter : (e.target.value || '')});
	}

	updateHostFilter(e) {
		this.setState({ hostFilter : (e.target.value || '')});
	}

	updateTagFilter(e) {
		this.setState({ tagFilter : (e.target.value || '')});
	}

	renderMessageInput() {
		return (<input type="text" value={this.state.messageFilter || ''} onChange={this.updateMessageFilter.bind(this)} className="form-control form-control-sm" placeholder="Message Content" />);
	}

	renderHostInput() {
		return (<input type="text" value={this.state.hostFilter || ''} onChange={this.updateHostFilter.bind(this)} className="form-control form-control-sm" placeholder="Host" />);
	}

	renderTagInput() {
		return (<input type="text" value={this.state.tagFilter || ''} onChange={this.updateTagFilter.bind(this)} className="form-control form-control-sm" placeholder="Tag" />);
	}
	
	renderPriorityButton(i) {
		let icon = this.state.priorityFilter[i] === i ? 'check-square' : 'square';
		return (<li key={i} className="list-inline-item" onClick={() => this.changePriority(i)}><FontAwesomeIcon icon={['far', icon]} /><span className="cursor-default"> {i}</span></li>);
	}

	changePriority(i) {
		const priority = this.state.priorityFilter.slice();
		priority[i] = priority[i] === i ? '' : i;
		this.setState({	priorityFilter: priority });
	}

	updatePage() {
		this.setState({page : 1}, ()=> {
			this.updateLogCookie();
			this.props.route.history.push('/1');
			this.getLogs();
		});
	}

	renderFilterToggle() {
		return (<Row onClick={()=>{this.expand()}}><Col className="cursor-default"><FontAwesomeIcon icon="filter" /> Show/Hide Filters</Col><Col className="text-right"><Badge>{this.state.data.total.toLocaleString() || 0} Logs</Badge></Col></Row>);
	}

	renderFilters() {
		if(this.state.expanded === 'open') return (this.renderFilterToggle());
		let filters = [0,1,2,3,4,5,6,7].map((i) => { return this.renderPriorityButton(i)});
		return (
			<Card className="mb-1">
				<CardBody>
					<Row><Col>{this.renderFilterToggle()}<hr /></Col></Row>
					<Row>
						<Col sm="4" md="3">Priority<ul className="list-inline d-inline ml-1">{filters}</ul></Col>
						<Col sm="2">{this.renderHostInput()}</Col>
						<Col sm="2">{this.renderTagInput()}</Col>
						<Col sm="2" md="4">{this.renderMessageInput()}</Col>
						<Col sm="1"><button type="button" className="btn btn-default btn-sm" onClick={() => this.updatePage()}>Update</button></Col>
					</Row>
				</CardBody>
			</Card>
		);
	}

	renderPage() {
		if(this.state.working) return;
		if(this.state.error) return (<Container><Alert color="danger">{this.state.error || 'Error'}</Alert></Container>);
		let hr = this.state.expanded === 'open' ? '' : <hr />;
		return (
			<Container fluid className="content">		
				{this.renderFilters()}{hr}{this.renderRows()}
				<div className="mt-1">{this.renderPaginator()}</div>
			</Container>
		);
	}


	render() {
		return (
			<div><Menu /><BlueDiv fluid />{this.renderPage()}</div>
		);
	}

}

export default LogPage;