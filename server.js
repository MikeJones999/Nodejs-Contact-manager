//-----------packages----------

var express = require('express');
var app = express();
////create connection to mongoDB
// var mongo = require('mongodb');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

//need this to parse json
var bodyParser = require('body-parser');
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//all javascripts need to  be placed inside js folder inside public
app.use(express.static(__dirname + '/public'));

app.listen(3000, function () 
{
 console.log("Example app listening at port 3000");
});


//-----connection to Mongodb---------------





//--------Get requests-------------------------
	app.get('/contactList', function (req, res) 
	{
		//res.sendFile(__dirname + '/index.html');
		console.log("***DEBUG*** Server Received a get request");
		
		//contactlist is name of server collection
		db.contactlist.find(function(err, docs)
		{
			//console.log(docs);
			res.json(docs);
		});
		
	});
	
	
	app.get('/contactList/:id', function(req, res)
	{
		var id = req.params.id;
		console.log("id to get: " + id);
		
		db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, docs)
			{
				//send back object as json
					res.json(docs);
			});
		
	});
	
	
//------------Delete requests----------------------

//delete request of contact via the id
app.delete('/contactList/:id', function (req, res)
{
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, docs)
		{
			res.json(docs);
		})
	
});
	

//------------Post requests----------------------

//posting from the forms in index.html
app.post('/contactList', function(req, res)
{
	var jsonIn = req.body;
	console.log("***DEBUG*** Post request " + jsonIn);
	
	db.contactlist.insert(jsonIn, function(err, docs)
	{
		res.json(docs);
	});
});



//----------------Put requests --------------------

app.put('/contactlist/:id', function (req, res) 
{
  var id = req.params.id;
		console.log(req.body.name);
		db.contactlist.findAndModify({
					query: {_id: mongojs.ObjectId(id)},
					update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
					new: true}, function (err, doc) {
		res.json(doc);
    }
  );
});




	//handle posts from AM Dash middleware routing
	app.post('/api/routing/post', function (req, res) 
	{
		var jsonIn = req.body;
		//print to server console
		console.log("/api/routing/post - Post . Found file(%s)", jsonIn.Filename);
		
		//send response
		res.send('connected');
	
	});