
const Config = {
	app_title : 'Joshua\'s Syslog Viewer',
	logs_endpoint : (args) => { 
		return 'https://127.0.0.1/syslog/json/?page='+args.id+'&priority='+args.priority+'&message='+(args.message || '')+'&host='+(args.host || '')+'&tag='+(args.tag || '');
	},
	visitors_endpoint : (args) => { 
		return 'https://127.0.0.1/api/visitors?page='+args.id; 
	},	
}
export default Config;