var events = require('events'),
	Future = require('fibers/future');

var slice = [].slice;

events.EventEmitter.prototype.future = function(eventType) {
	var future = new Future();
	this.once(eventType, function() {
		var args = slice.call(arguments);
		if (args.length == 1) args = args[0];
		future.return(args);
	});
	return future;
}

events.EventEmitter.prototype.wait = function(eventType) {
	return this.future(eventType).wait();
}