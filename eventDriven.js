//Import events module
var events = require('events');

//create an eventEmitter object
var eventEmitter = new events.EventEmitter();

//create an event handler
var connectHandler = function connected()
{
	console.log('connection successful');
	
	//Fire the data_received event
	eventEmitter.emit('data_received');
}

//bind the connection event with handler
//Adds the listener function to the end of the listeners array for the event named eventName connection
eventEmitter.addListener('connection', connectHandler);


//bind the data_received event with the anonymous function
eventEmitter.on('data_received', function()
{
	console.log('data received successfully');
});


//----------Fire the connection event------

//Synchronously calls each of the listeners registered for the event named connection
eventEmitter.emit('connection');
console.log("Event Driven process ended");