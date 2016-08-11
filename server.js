//-----------packages----------

var express = require('express');
var app = express();
////create connection to mongoDB
// var mongo = require('mongodb');
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var path = require('path');

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
	
	
	
	
	app.get('/contactList/getContact/:name', function(req,res)
	{
		var contactName = req.params.name;
		console.log("***DEBG*** Name to retreive " + contactName);
		
		//res.sendFile(__dirname, '../public/' + 'foundContacts.html');
		
		
			db.contactlist.findOne({name : contactName}, function (err, docs)
			{
				//send back object as json
				//res.send('/public/foundContacts.html');
				 //res.sendFile(__dirname + '/public/' + 'foundContacts.html');
					res.json(docs);
			});
			
		res.sendFile('foundContacts.html', { root: path.join(__dirname, '/public') });
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
	console.log("***DEBUG*** Post request " + jsonIn.name);
	
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



//need to route the post to a js file to decide what the request will do
	
	//use  to post new contact.....
	//curl -X POST --header "Content-Type: application/json" --data "{\"Person\" : {\"name\": \"Jemma\", \"email\": \"Jemma@hotmail.com\", \"number\": \"999123456\"}}" -H "Content-Type: application/json" http://localhost:3000/api/routing/post

	//handle posts from middleware
	app.post('/api/routing/post', function (req, res) 
	{
		
		console.log("***DEBUG*** POST REQUEST STARTED  ********");
		var jsonIn = req.body;
		//print to server console
		console.log("/api/routing/post - Post. Person found(%s)", jsonIn.Person.name);
		
		db.contactlist.insert({name: jsonIn.Person.name, email : jsonIn.Person.email, number : jsonIn.Person.number});
		
		//send response
		res.send('***DEBUG*** post received');
	
	});