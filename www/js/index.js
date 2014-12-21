var socket=null

var chart1
var data_cpu=[]
var data_ram=[]

function initPage(){
	console.log("initPage..")

	socket = io(window.location.protocol+"//"+window.location.hostname);
	initSocket()

	chart1 = new Highcharts.StockChart({//Chart
			global: {
				useUTC: true
				},
			chart: {
			            type: 'spline',
			            renderTo:"container"
			        },
			        legend:{
			        	enabled:true
			        },
			        rangeSelector : {
			            selected : 0,
			            inputEnabled:true,
			            buttons:[
				            {
				            	type:"second",
				            	count:10,
				            	text:"10sec"
				            },
			            	{
			            		type:"second",
			            		count:60,
			            		text:"1m"
			            	},
			            	{
			            		type:"minute",
			            		count:5,
			            		text:"5m"
			            	},
			            	{
			            		type:"minute",
			            		count:10,
			            		text:"10m"
			            	},
			            	{
			            		type:"minute",
			            		count:60,
			            		text:"60m"
			            	}
			            ]
			        },
	        title: {
	            text: 'Server Utilization'
	        },
	        tooltip: {
	            crosshairs: [true,true]
	        },
	        xAxis: {
	        	range:60*1000
	        	//min:"1419099863921",
	        	//tickInterval:1000,
	            // dateTimeLabelFormats:{
	            // 	millisecond:'%S.%L',
	            // 	second:'%S',
	            // 	minute:'%M:%S',
	            // 	hour:'%H:%M:%S'
	            // }
	        },
	        yAxis: [
	        		{
		        	max:100,
		        	min:0,
		        	showFirstLabel:true,
		        	showLastLabel:true,
		        	tickInterval:20,
		        	autoscale:false,
		            title: {
		                text: 'Usage [%]'
		            	},
		            opposite:false	
	            	}
	        // 		{
		       //  	max:100,
		       //  	min:0,
		       //      title: {
		       //          text: 'Usage RAM'
		       //      	},
		       //      opposite: true
	        //     	},
	        // 		{
		       //  	max:100,
		       //  	min:0,
		       //      title: {
		       //          text: 'Test'
		       //      	},
		       //      opposite: true	
	        //     	}	            		            	
	             ],//Y axis
	        //},
	        series: [

	        		{
			        	yAxis:0,
			            name: 'CPU',
			            tooltip:{
			            	pointFormat:'<span style="color:{series.color}">\u25CF</span> {series.name}: <b>total:{point.y} %</b>, sys: {point.sys} %, user: {point.user} %, idle: {point.idle} % <br/>'
			            }
			            //data: [[1419100758856,10],[1419100759884,15],[1419100760910,5],[1419100761936,12],[1419100762962,2],[1419100763988,20],[1419100765015,10]]
		        	}, 
		        	{
			        	yAxis:0,	
			            name: 'RAM',
			            tooltip:{
			            	pointFormat:'<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y} %, {point.mem} MB</b>, total: {point.total} MB, used: {point.used} MB, free: {point.free} MB, buffers: {point.buffers}<br/>'
			            }
			            //data: [{y:5,mem:123}, {y:33,mem:321}, {y:55,mem:334}]
		        	}
	        	
	        	]//series
	    });//Highcharts

//PROCESS CPU
chart_cpu = new Highcharts.StockChart({//Chart
		global: {
			useUTC: true
			},
		chart: {
		            type: 'spline',
		            renderTo:"containerProcessCPU"
		        },
		        legend:{
		        	enabled:true
		        },
		        rangeSelector : {
		            selected : 0,
		            inputEnabled:true,
		            buttons:[
			            {
			            	type:"second",
			            	count:10,
			            	text:"10sec"
			            },
		            	{
		            		type:"second",
		            		count:60,
		            		text:"1m"
		            	},
		            	{
		            		type:"minute",
		            		count:5,
		            		text:"5m"
		            	},
		            	{
		            		type:"minute",
		            		count:10,
		            		text:"10m"
		            	},
		            	{
		            		type:"minute",
		            		count:60,
		            		text:"60m"
		            	}
		            ]
		        },
        title: {
            text: 'Process CPU Utilization'
        },
        tooltip: {
            crosshairs: [true,true]
        },
        xAxis: {
        	range:60*1000,
        },
        yAxis: [
        		{
	        	max:100,
	        	min:0,
	        	showFirstLabel:true,
	        	showLastLabel:true,
	        	tickInterval:20,
	        	autoscale:false,
	            title: {
	                text: 'Usage CPU [%]'
	            	},
	            opposite:false,
            	}            		            	
             ],//Y axis
        series: [
        			// {
        			// 	yAxis:0,
        			// 	name:"CPU"
        			// }
        	]//series
    });//Highcharts

//PROCESS RAM
chart_ram = new Highcharts.StockChart({//Chart
		global: {
			useUTC: true
			},
		chart: {
		            type: 'spline',
		            renderTo:"containerProcessRAM"
		        },
		        legend:{
		        	enabled:true
		        },
		        rangeSelector : {
		            selected : 0,
		            inputEnabled:true,
		            buttons:[
			            {
			            	type:"second",
			            	count:10,
			            	text:"10sec"
			            },
		            	{
		            		type:"second",
		            		count:60,
		            		text:"1m"
		            	},
		            	{
		            		type:"minute",
		            		count:5,
		            		text:"5m"
		            	},
		            	{
		            		type:"minute",
		            		count:10,
		            		text:"10m"
		            	},
		            	{
		            		type:"minute",
		            		count:60,
		            		text:"60m"
		            	}
		            ]
		        },
        title: {
            text: 'Process RAM Utilization'
        },
        tooltip: {
            crosshairs: [true,true]
        },
        xAxis: {
        	range:60*1000,
        },
        yAxis: [
        		{
	        	max:100,
	        	min:0,
	        	showFirstLabel:true,
	        	showLastLabel:true,
	        	tickInterval:20,
	        	autoscale:false,
	            title: {
	                text: 'Usage RAM [%]'
	            	},
	            opposite:false,
            	}            		            	
             ],//Y axis
        series: [
        			// {
        			// 	yAxis:0,
        			// 	name:"RAM"
        			// }
        	]//series
    });//Highcharts

}//initPage

function startMonitoring(obj){
	console.log("startMonitoring...")
	socket.emit("monitoring",{action:obj.isRunning?"stop":"start"})
}//startMonitoring

function initSocket(){
	socket.on('welcome', function (data) {
    	console.log("WELCOME MESSAGE from server: "+JSON.stringify(data));
    	socket.emit("welcome",{data:"Hi from client!"})
    })//on welcome

	socket.on('err', function (data) {
		console.log("error: "+data)
    })//on error

    socket.on("top",function(data){
    	//console.log(JSON.stringify(data.ram))
    	var val_cpu={
    			x:data.time,
    			y:parseFloat((100.0-data.cpu["idle"]).toFixed(2)),//usage
    			idle:data.cpu["idle"],
    			sys:data.cpu["system"],
    			user:data.cpu["user"]
    			}
    			
    	var val_ram={
    			x:data.time,
    			y:parseFloat((100.0*data.ram["used"]/data.ram["total"]).toFixed(2)),
    			mem:parseInt(data.ram["used"]/1024),
    			total:parseInt(data.ram["total"]/1024),
    			used:parseInt(data.ram["used"]/1024),
    			free:parseInt(data.ram["free"]/1024),
    			buffers:data.ram["buffers"]
    		}

    		chart1.series[0].addPoint(val_cpu,true)
    		chart1.series[1].addPoint(val_ram,true)
    		//process
    	//{"pid":"4212","user":"User","pr":"8","ni":"0","virt":"565m","res":"491m","shr":"42m","s":"S","cpu":"2","mem":"6.1","time":"0:01.07","command":"node"}

    		var insertProcessData=function(_chart,_val,_pid,_name,_tooltip){
    			var proc_data={
    					x:data.time,
    					y:parseFloat(_val),
    					pid:_pid
    				}
    			var series=checkSeries(_chart,proc.pid)
    			if(!series){
    				if(_val>0.0){
    				series={
    					yAxis:0,
    					name:_name,
    					tooltip:{
    						pointFormat:'<span style="color:{series.color}">\u25CF</span> {series.name}: '+_tooltip+', pid: {point.pid}<br/>'
    					}
    				}
    				series=_chart.addSeries(series,false)
    				series.pid=_pid
    				}//if _val >0
    			}//if !series
    			else{
    			series.addPoint(proc_data,false)
    			}//else
    		}//insertProcessData

	    	for(var i=0,proc=data.process[i];i<data.process.length;proc=data.process[++i]){	    		
	    		insertProcessData(chart_cpu,proc.cpu,proc.pid,proc.command,"<b>{point.y} %</b>")
	    		insertProcessData(chart_ram,proc.mem,proc.pid,proc.command,"<b>{point.y} MB</b>")
	    	}//for i process
	    	chart_cpu.redraw()
	    	chart_ram.redraw()
    })//download

function checkSeries(_chart,_pid){
	    		for(var i=0,series=_chart.series[i];i<_chart.series.length;series=_chart.series[++i]){
	    			//console.log(series.pid)
	    			if(series.pid==_pid){return series}
	    		}//for i series
	    	return false
}//checkSeries

    socket.on("status",function(data){
    	//console.dir(data)
    	if(data.status=="running"){
    		var obj=document.getElementById("button_start_id")
    			obj.value="Stop"
    			obj.isRunning=true



    	}//if running
    		else if(data.status=="stopped"){
    			var obj=document.getElementById("button_start_id")
    				obj.value="Start"
    				obj.isRunning=false
    		}//if stopped

    })//download

}//initSocket 