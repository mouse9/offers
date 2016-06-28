var express = require('express');
var bodyParser  = require('body-parser');
var app = express(); 	
var mysql = require("mysql");
var multer = require("multer");

 var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './finalStart/vendorImage/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
		console.log(file);
		var x = file.mimetype.split("/");
            cb(null, req.body.id+'image'+req.body.num+'.'+x[1] );
		var tableName = 'vendor';
		console.log('update '+tableName+' set imageUrl'+req.body.num+' = \'/vendorImage/'+req.body.id+'image'+req.body.num+'.'+x[1]+'\' where userId = \''+req.body.id+'\';');		
		con.query('update '+tableName+' set imageUrl'+req.body.num+' = \'/vendorImage/'+req.body.id+'image'+req.body.num+'.'+x[1]+'\' where userId = \''+req.body.id+'\';');
		
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');






// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "omm",
database:"app"

});

// webapp is the folder containg your application
app.use('/', express.static('finalStart'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	console.log(req.url);
   res.sendFile( __dirname + "/finalStart/" + "index.html" );
})


app.get('/admin',function(req,res){
	res.setHeader('Content-Type','text/html');
	res.sendFile( __dirname + "/finalStart/admin/" + "admin.html" );

})

app.get('/temp',function(req,res){
	res.setHeader('Content-Type','text/html');
	res.sendFile( __dirname + "/finalStart/" + "scrol.html" );

})

app.post('/temp2.html',function(req,res){
	console.log(req.body);
})

app.post('/finalClicked.html',function(req,res){
	console.log("in final "+ req.body.RowDataPacket);
	console.log("in final"+ req.body);
	con.query('SELECT userId,number,emailAddress,imageUrl1,imageUrl2,imageUrl3,address,timing,closedOn,nameOfShop FROM vendor where userId =\''+req.body.abc+'\';',function(err,rows){
  	if(err) throw err;
	console.log(rows[0]);
	var x = rows[0];
	res.end(JSON.stringify(x));

});


})

app.post('/finalClickedVendor.html',function(req,res){
	console.log("in final "+ req.body.RowDataPacket);
	console.log("in final"+ req.body);
	con.query('SELECT * FROM vendor where userId =\''+req.body.abc+'\';',function(err,rows){
  	if(err) throw err;
	console.log(rows[0]);
	var x = rows[0];
	res.end(JSON.stringify(x));

});


})

app.post('/finalClickedVendorOffers.html',function(req,res){
	var x ={};	

	console.log("------------------------Entered Offers Vendorr --------------------------\n\n\n\n");
	console.log(req.body.abc);
	con.query('SELECT * FROM vendor where userId =\''+req.body.abc+'\';',function(err,rows){
  	if(err) throw err;
	console.log("------------After Select---------\n"+rows[0]);
	x = rows[0].offerTable;
	console.log(x +"is tables name");console.log(x +"is tables name out of query in query");
	});
	console.log(x +"is tables name out of query");
	setTimeout(function(){
	con.query('create table if not exists '+x+' (id int auto_increment,head varchar(100),description varchar(200),startDate varchar(10),endDate varchar(10),primary key(id));',function(err,rows){
  	if(err) throw err;

	});

	con.query('SELECT * FROM '+x+' ;',function(err,rows){
  	if(err) throw err;
	console.log(rows[0]);
	var xx = rows;
		res.end(JSON.stringify(xx));
	});
	},(1*1000));

})

app.post('/offers.html',function(req,res){
	var x ={};	

	console.log("------------------------Entered Offers Vendorr --------------------------\n\n\n\n");
	console.log(req.body.abc);
	con.query('SELECT * FROM vendor where userId =\''+req.body.abc+'\';',function(err,rows){
  	if(err) throw err;
	console.log("------------After Select---------\n"+rows[0]);
	x = rows[0].offerTable;
	console.log(x +"is tables name");console.log(x +"is tables name out of query in query");
	});
	console.log(x +"is tables name out of query");
	setTimeout(function(){
	con.query('create table if not exists '+x+' (id int auto_increment,head varchar(100),description varchar(200),startDate varchar(10),endDate varchar(10),primary key(id));',function(err,rows){
  	if(err) throw err;

	});

	con.query('SELECT * FROM '+x+' ;',function(err,rows){
  	if(err) throw err;
	console.log(rows[0]);
	var xx = rows;
		res.end(JSON.stringify(xx));
	});
	},(1*1000));

})



app.post('/addData.html',function(req,res){
	console.log(req.body);
	var userId = '\''+req.body.userId+'\',';
	var password = '\''+req.body.password+'\',';
	var number = '\''+req.body.number+'\',';
	var emailAddress = '\''+req.body.emailAddress+'\',';
	var offerTable = '\''+req.body.userId+'offer'+'\',';
	var nameOfShop = '\''+req.body.nameOfShop+'\',';
	var address = '\''+req.body.address+'\',';
	var category = '\''+req.body.category+'\',';
	var timings = '\''+req.body.timings+'\',';
	var closedOn = '\''+req.body.closedOn+'\',';
	var imageUrl1='\''+req.body.userId+'image1\',';
	var imageUrl2='\''+req.body.userId+'image2\',';
	var imageUrl3='\''+req.body.userId+'image3\',';
	var sub = '\''+req.body.sub+'\'';
	console.log(userId+password+number+emailAddress+offerTable+address+category+timings+closedOn+nameOfShop);
	con.query('insert into vendor (userId,password,number,emailAddress,offerTable,address,mainCategory,timing,closedOn,nameOfShop,imageUrl1,imageUrl2,imageUrl3,sub) values ( '+userId+password+number+emailAddress+offerTable+address+category+timings+closedOn+nameOfShop+imageUrl1+imageUrl2+imageUrl3+sub+');',function(err,rows){
		  if(err) throw err;
			
			res.sendFile( __dirname + "/finalStart/admin/" + "dataInserted.html" );		

	});
		
})

app.post('/checkAvail.html',function(req,res){
	res.setHeader('Content-Type','application/json');	
	var a=req.body.number;
	con.connect(function(err){
	  if(err){
	    console.log('Error connecting to Db');
	    return;
	  }
	  console.log('Connection established');
	});
con.query('SELECT * FROM user',function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
	for(var ii=0;ii<rows.length;ii++){
			console.log(rows[ii].mobileNumber);	
		if(rows[ii].mobileNumber==a){req.body.allow=false;a=0;break;}
		
	}
	console.log(req.body);
	if(a!=0){
		req.body.allow=true;
	}	
	console.log(req.body);
	console.log(req.body);
res.end(JSON.stringify(req.body));

});


})

app.post('/loginMe.html', function (req, res) {
	  /* Handling the AngularJS post request*/
	var x={};
	res.setHeader('Content-Type','application/json');
    console.log(req.body);
	con.query('SELECT * FROM user',function(err,rows){
		  if(err) throw err;

	  console.log('Data received from Db:\n');
	var check=true;
	for(var ii=0;ii<rows.length;ii++){
			num=rows[ii].mobileNumber;
			pass=rows[ii].password;	
		
		if(req.body.namee==num && req.body.Password==pass){
			x.ans=true;
			check=false;
		}
	
	}
	if(check){
		x.ans=false;
		x.message="UserName or Password is Incorrect..";
	}
	console.log(x);
	res.end(JSON.stringify(x));
});

	console.log(req.body);
	
	
    /*Sending the respone back to the angular Client */
})


app.post('/loginMeVendor.html', function (req, res) {
	  /* Handling the AngularJS post request*/
	var x={};
	res.setHeader('Content-Type','application/json');
    console.log(req.body);
	con.query('SELECT * FROM vendor',function(err,rows){
		  if(err) throw err;

	  console.log('Data received from Db in login Me Vendor :\n'+req.body[0]);
	var check=true;
	for(var ii=0;ii<rows.length;ii++){
			num=rows[ii].userId;
			pass=rows[ii].password;	
		
		if(req.body.userId==num && req.body.Password==pass){
			x.ans=true;
			check=false;
		}
	
	}
	if(check){
		x.ans=false;
		x.message="UserId or Password is Incorrect..";
	}
	console.log('value of x'+x);
	console.log('value of body'+req.body);	
	res.end(JSON.stringify(x));
	
});

	console.log(req.body);
	
	
    /*Sending the respone back to the angular Client */
})



app.post('/registerMe.html', function (req, res) {
	  /* Handling the AngularJS post request*/
	var b = req.body.num;var c = req.body.pass;var d = req.body.email;
	    console.log(req.body);
	con.connect(function(err){
	  if(err){
	    console.log('Error connecting to Db');
	    return;
	  }
	  console.log('Connection established');
	});
console.log('insert into user (mobileNumber,password,emailAddress) values (\''+b+'\',\''+c+'\',\''+d+'\')');
con.query('insert into user (mobileNumber,password,emailAddress) values (\''+b+'\',\''+c+'\',\''+d+'\')',function(err,rows){
  if(err) throw err;

  console.log('Data updated:\n');
		console.log(rows);	
		req.body.yes=true;	
		console.log(req.body);	

});
	
	console.log("wding2");
	res.setHeader('Content-Type','text/html');
	res.write("Hello");
	res.end();
		
	
    /*Sending the respone back to the angular Client */
})

app.post('/shopsdata.html',function(req,res){
		console.log(req.body);
		var category = req.body.abc;
		con.query('select userId,number,imageUrl1,imageUrl2,imageUrl3,address,timing,closedOn,nameOfShop,sub from vendor where mainCategory =\''+category+'\';',function(err,rows){
		if(err) throw err;
		
		res.setHeader('Content-Type','application/json');
		res.end(JSON.stringify(rows)); 
	});

})

app.post('/addoffer',function(req,res){
	var x= {};
	console.log("Adding offer\n------------------------------\n");
	var head = '\''+req.body.head+'\',';
	var des = '\''+req.body.des+'\',';
	var valid = req.body.valid;
	var offerTable = req.body.userId+'offer';
	var start = new Date();
	var endDate = new Date();
	var da = endDate.getDate(endDate.setDate(endDate.getDate()+Number(valid)));
	var month = endDate.getMonth()+1;
	var year  = endDate.getFullYear();
	var endDateString = '\''+da+'/'+month+'/'+year+'\'';
	da = start.getDate();
	month = start.getMonth()+1;
	year= start.getFullYear();
	var startDateString = '\''+da+'/'+month+'/'+year+'\',';
	x.done=false;
	con.query('insert into '+offerTable+'(head,description,startDate,endDate) values('+head+des+startDateString+endDateString+');',function(err,rows){
		if(err) throw err;

		x.done = true;
		res.setHeader('Content-Type','application/json');
		res.end(JSON.stringify(x));

	});

		
		
})


app.post('/removeoffer',function(req,res){
	var offerTable = req.body.userId+'offer';
	con.query("delete from "+offerTable+" where id ="+req.body.offerId+";",function(err,rows){

		if(err) throw err;
		var x ={};
		x.done = true;
		res.setHeader('Content-Type','application/json');
		res.end(JSON.stringify(x));
	});
		
		
})



app.post('/addimage',function(req,res){
	console.log(req.body.num);
	upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
		
})

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
