var setupViews = require('./views/problems');
var lib = require('./lib/calculate');
var seedrandom = require('seedrandom');


module.exports = function (dbConn) {
  var db = dbConn.database('utmq-core-problems');

  setupViews(db);

  return {
    post: function (req, res, next) {
      req.body.created_at = new Date();
      req.body.updated_at = new Date();
      req.body.questions = [];
      db.save(req.body, function (err, body) {
        res.contentType = 'json';
        if (!err) {
          res.send({
            result: body
          });
        } else {
          res.send({
            error: true,
            result: err
          });
        }
      });

    },
    put: function (req, res, next) {
      var update = req.body;

      db.save(update.id, update._rev, update, function (err, body) {
        res.send(200, {body: body, error: err});
      });

    },
    get: function (req, res, next) {
      var id = req.params.id;

      db.get(id, function (err, problem) {
        if (!err) {

          // TODO: specify role update this.
          if (req.params.role && req.params.role === 'student') {
            console.log('student request');
            problem.questions.forEach(function(question) {
              question.field_variables.forEach(function(v) {
                // integer type of variables
                if (v.type === 'int') {
                  // create a seed for randomization
                  // TODO: sanitize question title?
                  var seed = req.session.email + question.name + question.field_title + '.';
                  var rng = seedrandom(seed); // creates a new PRNG
                  var rnd = rng(); // gives random seed
                  var min = parseInt(v.from, 10);
                  var max = parseInt(v.to, 10);
                  var result = min + Math.floor(rnd * (max - min + 1));

                  console.log('RND',rnd);
                  console.log('Result',result);

                  question.field_question = lib.replaceAll(question.field_question, '@' + v.name, result);
                }
              });
            });
          }

          res.cache(false);
          res.send(200, problem);
        } else {
          res.send(500);
        }

      });
    },
    del: function (req, res, next) {
      console.log(req);
    }
  };

};



