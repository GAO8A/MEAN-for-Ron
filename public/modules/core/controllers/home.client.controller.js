'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.alerts = [
		
		{
			icon:'glyphicon-user',
			color:'btn-success',
			total:'1337',
			description:'TOTAL CUSTOMERS'

		},
		{
			icon:'glyphicon-calendar',
			color:'btn-primary',
			total:'8382',
			description:'UPCOMING EVENTS'

		},
		{
			icon:'glyphicon-edit',
			color:'btn-success',
			total:'527',
			description:'NEW CUSTOMERS IN 24HRS'

		},
		{
			icon:'glyphicon-record',
			color:'btn-info',
			total:'85000',
			description:'EMAILS SENT'

		},
		{
			icon:'glyphicon-eye-open',
			color:'btn-warning',
			total:'348',
			description:'FOLLOW UP REQUIRED'

		},
		{
			icon:'glyphicon-flag',
			color:'btn-danger',
			total:'348',
			description:'REFERRALS TO MODERATE'

		}

		];
	}
]);