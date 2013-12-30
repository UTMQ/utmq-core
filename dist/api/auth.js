// Persona Verifier
var verify = require('browserid-verify')();

module.exports = function (settings, dbConn) {
  // Persona audience
  var audience = settings.audience;
  var dbStudent = dbConn.database('utmq-core-students');
  var dbInstructor = dbConn.database('utmq-core-instructors');

  return {
    /**
     * Authenticate a student
     * @param req
     * @param res
     * @param next
     */
    authStudent: function (req, res, next) {
      var assertion = req.body.assertion;

      verify(assertion, audience, function (err, email, data) {
        if (err) res.send(500, { status: 'failure', reason: '' + err });

        // got a result, check if it was okay or not
        if (email && data.status === 'okay') {
          dbStudent.get(email, function (err, doc) {

            // if no student with this name
            if (!doc) {
              dbStudent.save(email, { }, function (err, body) {
                req.session.email = email;
                res.send(200, data);
              });
            }
            // if error occured
            else if (err) {

              res.send(403);

            // if student exists
            } else {
              console.log(doc);
              req.session.email = email;
              res.send(200, data);
            }

          });
        } else {
          res.send(403, data)
        }
      });
    },
    /**
     * Authenticate an instructor
     * @param req
     * @param res
     * @param next
     */
    authInstructor: function (req, res, next) {
      var assertion = req.body.assertion;

      verify(assertion, audience, function (err, email, data) {
        // got a result, check if it was okay or not
        if (email && data && data.status === 'okay') {
          dbInstructor.get(email, function (err, doc) {
            // if no student with this name
            if (doc && doc._id === email) {
              req.session.email = email;
              res.send(200, data);
            } else {
              res.send(403, {error: { body: 'Login Failed' } });
            }
          });
        } else {
          res.send(403, {error: { body: 'Login Failed' } })
        }
      });
    }
  }
};

