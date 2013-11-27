var https = require('https'),
// Persona Verifier
verify = require('browserid-verify')();

// Read app settings
var config = require('yaml-config');
var settings = config.readConfig('config.yaml');

var restify = require('restify');
// Problem Set API Config
var problemApi = require('./api/problemApi');
// Instructor API Config
var InstructorApi = require('./api/instructorApi');

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

server.get('/echo/:name', function (req, res, next) {
    res.send(req.params);
    return next();
});


/*  
  Problem API
*/
server.post('/problems', problemApi.post);
server.put('/problems', problemApi.put);
server.get('/problems', problemApi.getAll);
server.get('/problems/:id', problemApi.get);
server.del('/problems/:id', problemApi.del);


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
