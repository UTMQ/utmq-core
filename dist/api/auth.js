// Persona Verifier
var verify = require('browserid-verify')();

module.exports = function (settings) {

  return {
    post: function (req, res, next) {
        var assertion = req.body.assertion;
        var audience = settings.audience;

        verify(assertion, audience, function (err, email, data) {
          if (err) {
            return res.send(500, { status: 'failure', reason: '' + err });
          }

          // got a result, check if it was okay or not
          if (email) {
            req.session.email = email;
            return res.send(200, data);
          }

          // request worked, but verfication didn't, return JSON
          console.error(data.reason);
          res.send(403, data)
        });

    }

  }

};

