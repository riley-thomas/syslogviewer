import React, { Component } from 'react';
import { Container, Alert } from 'reactstrap';
import DataFetcher from '../Utils/DataFetcher';
import VisitorTable from './VisitorTable';
import Paginator from '../Utils/Paginator';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Menu from '../Utils/Menu';
import BlueDiv from '../Utils/BlueDiv';

class VisitorPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			page: this.props.route.match.params.page,
			working: true,
			fetching: false,
			data : null,
			error : null
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.props.page !== nextProps.page) this.setState({page: nextProps.page}, ()=> this.getVisitors());
	}

	componentWillMount() {
		this.getVisitors();
	}

	getVisitors() {
		this.setState({fetching : true});
		DataFetcher({type:'visitors', id: this.state.page}).then( (visitors) => {
            this.setState({data : visitors});
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
		return <VisitorTable rows={this.state.data.data} />;
	}

	renderPaginator() {
		return <Paginator base="/visitors" pagecount={this.state.data.last_page} currentpage={this.state.data.current_page} />
	}

	stopWorking() {
		this.setState({working:false, fetching: false});
	}

	renderPage() {
		if(this.state.working) return;
		if(this.state.error) return (<Container><Alert color="danger">{this.state.error || 'Error'}</Alert></Container>);
		return (
			<Container fluid className="content">		
				{this.renderRows()}
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

export default VisitorPage;