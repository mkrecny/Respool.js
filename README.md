# Respool.js

Respool is a simple utility for managing a finite pool of resources in node. A resource can be any object. The imagined use-case is client-pools. 

## Usage

	var rp = require('./path/to/respool.js');
	var resources = [{"name":"resource 1"}, {"name":"resource 2"}, {"name":"resource 3"}];

	var pool = rp.createPool();
	
	pool.fillPool(resources, function(err, res){
		//pool now loaded with resources 
	});
	
	pool.getResource(function(err, resource){
		//do something with resource...
		//...now return resource to pool:
		pool.freeResource(resource, (err, res){
			//resource now available in pool
		});
	});
	
## Notes

### Availability
If getResource() is called when no resources are currently available, getResource will simply be called again in 100ms.
Once a resource is available the original callback will be called and the resource supplied.

### Urgency	
You can specify the length of the interval that is waited when getResource() encounters an empty pool, before re-calling.
	
	pool.setUrgency(200, function(err, res){
		//now any calls to an empty pool will wait 200ms before re-calling.
	});
	
