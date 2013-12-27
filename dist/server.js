var clientSessions = require('client-sessions');

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
var calculateApi = require('./api/calculate')(settings);
var authApi = require('./api/auth')(settings);
// var studentsApi = require('./api/students')(db);

var port = process.env.PORT || settings.appPort;
var hostname = process.env.HOST || "http://localhost";


var server = restify.createServer({
  name: 'UTMQ',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(clientSessions({
  secret: settings.secret,
  cookieName: 'session'
}));

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
  Calculate API
 */
server.post('/calculate', calculateApi.post);
server.post('/calculateForQuestion', calculateApi.calculateForQuestion);

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

server.get('/login', function (req, res, next) {
  res.send({ email: req.session.email });
});

server.post('/logout', function (req, res, next) {
  req.session.reset();
  res.send(200, { status: "okay" });
});

server.post('/auth', authApi.post);

server.get(/\/?.*/, restify.serveStatic({
  directory: "../app",
  default: "index.html"
}));

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
