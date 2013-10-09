'use strict';

angular.module('UTMQViewerApp')
  .service('pouchService', function pouchService($rootScope) {
  	console.log('pouchService ready');
  	var db = new PouchDB('authoring');


    // AngularJS will instantiate a singleton by calling "new" on this function

    return  {
    	save: function() {
    		console.log('pouchService::save');
    		var doc = {
    			_id: 'problemSet' + new Date().getTime(),
 					name: 'ProblemSet::Name'
				};

    		db.put(doc, function(err, response) { 
    			console.log(err, response);
    		});
    	},
    	query: function(cb) {
    		db.allDocs({include_docs: true}, function(err, response) {
    			console.log('pouchService::query');
    			console.log(err);
    			if (!err) {
    				cb(response);
    			} else {
    				cb(null);
    			}
    		});
    	}
    }
  });
