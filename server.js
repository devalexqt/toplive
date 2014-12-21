var http=require('http')
var fs=require("fs")
var mime=require("mime")
var url = require("url")
var less = require('less')//css processor
var swig  = require('swig')// html templete processor
var top=require("./top_spawn.js")

var rootpath="./www/"

var server=http.createServer(handler).listen(8081)
var io = require('socket.io')(server)

swig.setDefaults({ cache: false,allowErrors: true });

console.log("==>Simple server for developing started on port 8081. Now visit to http://127.0.0.1/ or http://127.0.0.1/index.html \n Working directory: "+rootpath)


io.on('connection', function(socket){
  console.log('==>> a user connected');
  socket.emit('welcome', { data: 'Hi from server' });

  socket.on("welcome",function(data){
  	console.log(data)
  })//welcome

  socket.on("monitoring",function(data){
  	console.log(data)
  	if(data.action=="start"){
  		startMonitoring(true,socket)
  	}//if start
  	else if(data.action=="stop"){
  		startMonitoring(false,socket)
  	}//if stop

  })//welcome

  socket.on("cancel_convert",function(data){
  	//console.log(data)
  	socket.cancel_convert=true
  })//welcome

  socket.on("disconnect",function(data){
  	console.log("===========> disconnect! , data: "+data)
  	startMonitoring(false,socket)
  })//welcome
});//new socket connection

function startMonitoring(_action,socket){
	if(_action==true){
	var stated=top.start(10,function(err,data){
			if(err){console.log(err);return}
			socket.emit("top",data)
		})//start
	socket.emit("status",{status:"running"})
	}//if
	else{
		top.stop()
		socket.emit("status",{status:"stopped"})
	}//else

}//startMonitoring



function handler(req,res){
	console.log("==>New request: "+req.method+", "+req.url)
	var url_parts=url.parse(req.url,true)
	var that=this

	// var headers=[]
	// headers["Access-Control-Allow-Origin"] = "*";
	// headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	// headers["Access-Control-Allow-Credentials"] = false;
	// headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	// headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	//res.writeHead(200, headers);


	if(url_parts.pathname=="/"){url_parts.pathname="/index.html"}	

	var req_file=rootpath+url_parts.pathname
	var extention=req_file.split(".")
		extention=extention[extention.length-1]

		if (extention=="css"&&fs.existsSync(req_file.replace(".css",".less"))) {
			req_file=req_file.replace(".css",".less")
		    extention="less"
		}// if css

  	fs.readFile(req_file,function(err,data){
	  	if (err){console.log("==>cant read requsted file, err: "+err);res.statusCode=404;res.end(); return};
	  	var mime_type=mime.lookup(req_file)
	  	// console.log("==>mime: "+mime_type)
	     //headers.push({"Content-Type":mime_type})


			//console.log("==>extention: "+extention)

		if(extention=="js"){
			sendPage(data,"text/javascript")
		}//if js
		else if(extention=="less"){
			less.render(data.toString(),{paths: rootpath}, function (err, data) {
				if (err){console.log("==>cant parse less file, err: "+err);res.statusCode=404;res.end(); return};
				sendPage(data.css,"text/css")//[css,imports]
			})//less
		}//if css
		else if(extention=="html"){
			swig.renderFile(req_file, {year:new Date().getFullYear()},function (err, data) {
				if(err){console.log("SWIG can't rende file: "+req_file+", error: "+err);res.statusCode=404;res.end();return}
					sendPage(data,"text/html")	
			})//rende
		}//if html
		else{
			sendPage(data,mime_type)	
		}//else

	})//readFile

		var setHeaders=function(data,type,code){
			res.statusCode=code?code:200		
			res.setHeader("Content-Type",type?type:"text")
			res.setHeader("Content-Length",data.length)
		}//setHeaders

		var sendPage=function (data,type,code){
			    setHeaders(data,type,code)
				res.end(data)
		}//sendPage



}//handler

