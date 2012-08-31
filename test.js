var Fiber = require('fibers'),
	ef = require('./events-future');
	
function input(hint) {
	var stdin = process.stdin, stdout = process.stdout;
	stdout.write(hint);
	stdin.resume();
	var res = stdin.wait('data').toString().replace(/[\n\r]+$/, '');
	stdin.pause();
	return res;
}

Fiber(function() {
	var name = input('What is your name? ');
	console.log('Hello, ' + name + '!');
	var age = input('And your age? ');
	console.log(name + ' is ' + age + ' years old!');
}).run();