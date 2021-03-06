'use strict';

var customersApp = angular.module('customers');

// Customers controller
customersApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers', '$modal', '$log', 
	function($scope, $stateParams, Authentication, Customers, $modal, $log) {
		this.authentication = Authentication;

				// Find a list of Customers
		this.customers = Customers.query();

				// open a modal window to create a single customer record
  		this.modalCreate = function (size) {

    	var modalInstance = $modal.open({
      	templateUrl: 'modules/customers/views/create-customer.client.view.html',
      	controller: function ($scope, $modalInstance){





  $scope.ok = function() {

    $modalInstance.close();
  	
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


      	},
      	size: size
      	    });

    modalInstance.result.then(function (selectedItem) {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



		// Remove existing Customer
		this.remove = function(customer) {
			if ( customer ) { 
				customer.$remove();

				for (var i in this.customers) {
					if (this.customers [i] === customer) {
						this.customers.splice(i, 1);
					}
				}
			} else {
				this.customer.$remove(function() {
					// $location.path('customers');
				});
			}
		};







		// open a modal window to update a single customer record
  		this.modalUpdate = function (size,selectedCustomer) {

    	var modalInstance = $modal.open({
      	templateUrl: 'modules/customers/views/edit-customer.client.view.html',
      	controller: function ($scope, $modalInstance, customer){

      		$scope.customer = customer;



  $scope.ok = function (isValid) {
  	if(isValid){

    $modalInstance.close($scope.customer);
  	}
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


      	},
      	size: size,
      	resolve: {
        	customer: function () {
          		return selectedCustomer;
        					}
      			}
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



	}
]);


customersApp.controller('CustomersCreateController', ['$scope', 'Customers','Authentication', 'Notify',
	function($scope, Customers, Authentication, Notify) {
		$scope.authentication = Authentication;

				// Create new Customer
		this.create = function() {
			// Create new Customer object
			var customer = new Customers ({
				firstName: this.firstName,
				surname: this.surname,
				suburb: this.suburb,
				country: this.country,
				industry: this.industry,
				email: this.email,
				phone: this.phone,
				referred: this.referred,
				channel: this.channel
			});

			// Redirect after save
			customer.$save(function(response) {
				
				// use notify service to send data 'newcustomer'
				Notify.sendMsg('NewCustomer',{'id': response._id});

	
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);



customersApp.controller('CustomersUpdateController', ['$scope', 'Customers','Authentication',
	function($scope, Customers, Authentication) {
		$scope.authentication = Authentication;

			this.update = function(updatedCustomer) {
			var customer = updatedCustomer;

			customer.$update(function() {
				//dont want to take us elsewhere
				// $location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);

customersApp.directive('customerList',['Customers', 'Notify', function(Customers, Notify){

	return{
		restrict:'E',
		transclude: true,
		templateUrl:'modules/customers/views/customer-list-template.html',
		link: function(scope, element, attrs){


			// when a new customer is added, update the customer list

		Notify.getMsg('NewCustomer', function(event, data){
			//b.c we are in a directive, we need to pass scope and the controller
			scope.customersCtrl.customers = Customers.query();

		});
		}
	};
}]);

		// // Create new Customer
		// $scope.create = function() {
		// 	// Create new Customer object
		// 	var customer = new Customers ({
		// 		firstName: this.firstName,
		// 		surname: this.surname,
		// 		suburb: this.suburb,
		// 		country: this.country,
		// 		industry: this.industry,
		// 		email: this.email,
		// 		phone: this.phone,
		// 		referred: this.referred,
		// 		channel: this.channel
		// 	});

		// 	// Redirect after save
		// 	customer.$save(function(response) {
		// 		$location.path('customers/' + response._id);
		// 		// change the url

		// 		// Clear form fields
		// 		$scope.firstName = '';
		// 		$scope.surname = '';
		// 		$scope.suburb = '';
		// 		$scope.country = '';
		// 		$scope.industry = '';
		// 		$scope.email = '';
		// 		$scope.phone= '';
		// 		$scope.referred = '';
		// 		$scope.channel = '';
	
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };

		// // Remove existing Customer
		// $scope.remove = function(customer) {
		// 	if ( customer ) { 
		// 		customer.$remove();

		// 		for (var i in $scope.customers) {
		// 			if ($scope.customers [i] === customer) {
		// 				$scope.customers.splice(i, 1);
		// 			}
		// 		}
		// 	} else {
		// 		$scope.customer.$remove(function() {
		// 			$location.path('customers');
		// 		});
		// 	}
		// };

		// // Update existing Customer
		// $scope.update = function() {
		// 	var customer = $scope.customer;

		// 	customer.$update(function() {
		// 		$location.path('customers/' + customer._id);
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };

		// // Find a list of Customers
		// $scope.find = function() {
		// 	$scope.customers = Customers.query();
		// };

		// // Find existing Customer
		// $scope.findOne = function() {
		// 	$scope.customer = Customers.get({ 
		// 		customerId: $stateParams.customerId
		// 	});
		// };
