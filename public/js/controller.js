var myApp = angular.module('app1', []);
myApp.controller('AppCtrl', function($scope, $http)
{
	//CONSOLE in browser
	console.log("Hello World from controller.js");
	var refresh = function()
	{
			//this is a request for the /contactList
			$http.get('/contactList').success(function(response)
			{
				console.log("Data received");
				$scope.contactList = response;
				//clear the contact boxes
				$scope.contact = "";
			});
	
	}
	
	refresh();
	
	
	
	$scope.searchForContact = function()
	{
		
			console.log("***DEBUG*** received " + $scope.search.name);
			//this is a request for the /contactList
			var name = $scope.search.name;
			$http.get('/contactList/getContact/' + name)
			
			/*.success(function(response)
			{
				console.log("Contact received back from get request: " + response.name);
				////clear the contact boxes
				$scope.search = "";			
				$scope.contact = response;
				//$scope.singleContact = response;			
			});
			
			*/
		
	}
	
	
	
	
	//adding a contact after button clicked in index.html
	$scope.addContact = function()
	{
		console.log("***DEBUG*** received " + $scope.contact.name);
		
		if($scope.contact.name === "")
		{
			//send input of new contact data to server
			$http.post('/contactList', $scope.contact).success(function (response)
			{
				console.log(response);
			})
			
			refresh();
		}
	}
	
	//delete contact - response to button click
	$scope.remove = function(contact_id)
	{
		console.log("***DEBUG*** contact id to remove: " + contact_id);
		$http.delete('/contactList/' + contact_id).success(function(response)
		{
			refresh();
			//console.log("Deleted: " response._id);
		});
	}
	
	//clicked on contact to edit
	$scope.edit = function(contact_id)
	{
		console.log(contact_id);
		//get contact from db
		$http.get('/contactList/' + contact_id).success(function(response)
		{
			$scope.contact = response;
		});
		
	}
	
	//update contact showing in boxes
	$scope.update = function()
	{
		console.log("update: " + $scope.contact._id);
		$http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response)
		{
			refresh();
		});
	}
	
$scope.footer = "Angular test--- @mikiej_boy@hotmail.com";
});

