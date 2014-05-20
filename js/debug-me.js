var Q = require('q');
var colors = require('colors');
var exec = require('child_process').exec,
    child;

debugger;
var speakers = [
	{
		name: 'Rob Sullivan'
		, title: 'Thoughtfully Establishing Postgres as the Best Data Store for Your JavaScript Application'
		, time: 8000
	}
	, {
		name: 'Karl Kirch'
		, title: 'Node Deployment with PM2'
		, time: 5000
	}
	, {
		name: 'Rick Yoesting'
		, title: 'Hubot Plugins'
	}
	, {
		name: 'Shane King'
		, title: 'Kraken.js'
		, time: 10000
	}
	, {
		name: 'Josh Bavari'
		, title: 'Javascript Debugging Techniques'
		, time: 10000
	}
];

function speakerBegin(speakerIndex) {
	var deferred = Q.defer();
	var speaker = speakers[speakerIndex];
	var speakerText = speaker.name.cyan.bold + ' is here to present '.red + speaker.title;
	var sayText = speaker.name + ' is here to present ' + speaker.title;
	var child = exec('say "' + sayText + '"', function (error, stdout, stderr) {});

	console.log('\n' + speakerText.green.bold);
	// console.log(speaker);
	// if(speakerIndex == 2 ) { debugger; }
	// console.trace();
	Q.delay(speaker.time || 100000)
	.done(function() {
		deferred.resolve(speakerIndex + 1);
	});

	return deferred.promise;
}

function eatPizza() {
	console.log('\n\nEating pizza... \n\n'.rainbow.bold)
	console.log('Belly is getting full\n\n'.rainbow.bold);
}

function beginTalks() {
	console.log('\n                     Welcome to '.white.bold + ' Backyard.js\n\n'.magenta.bold);
	var speechComplete = speakerBegin(0);

	speechComplete.then(function firstSpeakerComplete(nextSpeakerIndex) {
		return speakerBegin(nextSpeakerIndex);
	}).then(function secondSpeakerComplete(nextSpeakerIndex) {
		return speakerBegin(nextSpeakerIndex);
	}).then(function thirdSpeakerComplete(nextSpeakerIndex) {
		//Take a pizza break!!
		var deferred = Q.defer();
		setTimeout(function pizzaBreak() {
			eatPizza();
			deferred.resolve(nextSpeakerIndex);
		}, 1000);
		return deferred.promise;
	}).then(function fourthSpeakerComplete(nextSpeakerIndex) {
		return speakerBegin(nextSpeakerIndex);
	}).then(function finalSpeakerComplete(nextSpeakerIndex) {
		return speakerBegin(nextSpeakerIndex);
	}).fin(function(){
		console.log('\n\nThank the organizers, Jesse, Amanda, and Vance!\n\n'.inverse.bold)
	});
}


beginTalks();