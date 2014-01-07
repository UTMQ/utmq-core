// Setup logger
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "UTMQ"});

// Use node client sessions for server sessions
var clientSessions = require('client-sessions');
// Use restify for API and server
var restify = require('restify');

// Read app settings
var config = require('yaml-config');
var settings = config.readConfig('config.yaml');

// DB Connect
var dbConn = require('./db/db.js')(settings);

// Problem Set API Config
var problemsApi = require('./api/problems')(dbConn);
var instructorsApi = require('./api/instructors')(dbConn);
var coursesApi = require('./api/courses')(dbConn);
var submissionsApi = require('./api/submissions')(settings, dbConn);
var calculateApi = require('./api/calculate')(settings);
var authApi = require('./api/auth')(settings, dbConn);

// host and port configuration
var port = process.env.PORT || settings.appPort;
var hostname = process.env.HOST || "http://localhost";

// crete a restify server
var server = restify.createServer({
  name: 'UTMQ',
  version: '1.0.0',
  log: bunyan.createLogger({name: "server"})
});

server.on('uncaughtException', function (req, res, route, err) {
  log.error(err);
  res.send(new restify.InternalError("Internal server error"));
});

// restify configuration
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.gzipResponse());
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
server.get('/problems/:id', problemsApi.get);
server.del('/problems/:id', problemsApi.del);

/*
 Courses API
 */
server.post('/courses', coursesApi.post);
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
server.get('/instructors', instructorsApi.getAll);
server.del('/instructors/:id', instructorsApi.del);


/*
 Submissions API
 */
server.post('/submissions', submissionsApi.post);
server.put('/submissions', submissionsApi.put);
server.get('/submissions', submissionsApi.getAll);
server.get('/submissions/:id', submissionsApi.get);

// Returns current session email, auth role
server.get('/login', function (req, res, next) {
  res.send({ email: req.session.email, role: (req.session.role) ? req.session.role : 'student' });
});

// Resets session
server.post('/logout', function (req, res, next) {
  req.session.reset();
  res.send(200, { status: "okay" });
});

// authenticate student
server.post('/auth', authApi.authStudent);
// authenticate instructor
server.post('/authInstructor', authApi.authInstructor);

// all other requests
server.get(/\/?.*/, restify.serveStatic({
  directory: "../app",
  default: "index.html"
}));

// setup server
server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
