
const Config = {
	app_title : 'Joshua\'s Syslog Viewer',
	logs_endpoint : (args) => { 
		return 'https://10.19.214.116/syslog/json/?page='+args.id+'&priority='+args.priority+'&message='+(args.message || '')+'&host='+(args.host || '')+'&tag='+(args.tag || '');
	},
	visitors_endpoint : (args) => { 
		return 'https://10.19.214.112/api/visitors?page='+args.id; 
	},	
}
export default Config;