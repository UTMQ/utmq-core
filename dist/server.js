
// Persona Verifier
var verify = require('browserid-verify')();

// Read app settings
var config = require('yaml-config');
var settings = config.readConfig('config.yaml');

var restify = require('restify');

// DB Connect
var db = require('./db/db.js');

// Problem Set API Config
var problemsApi = require('./api/problems')(db);
var instructorsApi = require('./api/instructors')(db);
var coursesApi = require('./api/courses')(db);
var submissionsApi = require('./api/submissions')(db);

var port = process.env.PORT || settings.appPort;
var hostname = process.env.HOST || "http://localhost";
var audience = hostname + ":" + port;


var server = restify.createServer({
    name: 'UTMQ',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


/*  
  Problem API
*/
server.post('/problems', problemsApi.post);
server.put('/problems', problemsApi.put);
server.get('/problems', problemsApi.getAll);
server.get('/problems/:id', problemsApi.get);
server.del('/problems/:id', problemsApi.del);


/*
 Courses API
 */
server.post('/courses', coursesApi.post);
server.put('/courses', coursesApi.put);
server.get('/courses', coursesApi.getAll);
server.get('/courses/:id', coursesApi.get);
server.del('/courses/:id', coursesApi.del);


/*
 Instructors API
 */
server.post('/instructors', instructorsApi.post);
server.put('/instructors', instructorsApi.put);
server.get('/instructors', instructorsApi.getAll);
server.get('/instructors/:id', instructorsApi.get);
server.del('/instructors/:id', instructorsApi.del);


/*
 Submissions API
 */
server.post('/submissions', submissionsApi.post);
server.put('/submissions', submissionsApi.put);
server.get('/submissions', submissionsApi.getAll);
server.get('/submissions/:id', submissionsApi.get);
server.del('/submissions/:id', submissionsApi.del);


server.get(/\/?.*/, restify.serveStatic({
    directory: "../app",
    default: "index.html"
}));

server.post('/auth', function (req, res, next) {
  console.info('verifying with persona');

  var assertion = req.body.assertion;
  console.log(assertion);

  verify(assertion, audience, function(err, email, data) {
    if (err) {
      // return JSON with a 500 saying something went wrong
      console.warn('request to verifier failed : ' + err);
      return res.send(500, { status : 'failure', reason : '' + err });
    }

    // got a result, check if it was okay or not
    if ( email ) {
      console.info('browserid auth successful, setting req.session.email');
      console.log(email);
      return res.send(200);
    }

    // request worked, but verfication didn't, return JSON
    console.error(data.reason);
    res.send(403, data)
  });


});

server.get('/logout', function (req, res, next) {

});


server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});
