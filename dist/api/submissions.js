var async = require('async');

var setupViews = require('./views/submissions');


module.exports = function (settings, dbConn) {
  var db = dbConn.database('utmq-core-submissions');
  var dbProblems = dbConn.database('utmq-core-problems');

  var gap = require('gap-system')({
    path: settings.gapPath,
    workspace: 'workspace'
  });

  setupViews(db);

  var questionSolverIterator = function (item, cb) {
    gap.calculate(item.field_formula, function (err, resp) {
      console.log(resp);
      cb(err, resp);
    });
  };

  return {
    post: function (req, res, next) {
      var sub = req.body;

      // set submission date and author
      sub.created_at = new Date();
      sub.author = req.session.email;
      // TODO: check if existing for this problem id
      // set redo, don't set marks.

      // get the problem by id
      dbProblems.get(sub.problem, function (err, body) {
        if (err) res.send(500);

        var problem = body;
        console.log(problem);
        // TODO: async in parallel later on?
        // TODO: questions should have better IDs?
        // for questions in the problem
        // via https://github.com/caolan/async#mapseriesarr-iterator-callback
        async.mapSeries(problem.questions, questionSolverIterator, function (err, correctCalculations) {
          correctCalculations.forEach(function(calc, idx) {
            var result = 'wrong';
            var answer = sub.answers[idx];
            answer.correct = calc;
            answer.points = 0;

            // TODO: improve
            // if calculation is the same as answer
            console.log('calc', parseInt(calc), parseInt(answer.value));
            if (parseInt(calc) == parseInt(answer.value)) {
              result = 'correct';
              // set number of points
              answer.points = parseInt(problem.questions[idx].field_points);
            }
            // store the result of the comparison
            answer.result = result;
            // assign marks
          });

          // calculate answer for that question.
          db.save(sub, function (err, body) {
            if (!err) {
              res.send(200, { result: body });
            } else {
              res.send(500, { result: err });
            }
          });

        });
      });


    },
    put: function (req, res, next) {
      res.send(500, 'NO METHOD TO UPDATE');
    },
    get: function (req, res, next) {
      var id = req.params.id;

      db.get(id, function (err, body) {
        if (!err) {
          res.send(200, body);
        } else {
          res.send(500);
        }

      });
    },
    getAll: function (req, res, next) {

      // query by problem
      if (req.params && req.params.problem) {

        db.view('submissions/byProblem', {key: req.params.problem}, function (err, body) {
          if (!err && body && body.length !== 0) {
            res.send(200, { body: { rows: body } });
          } else if (!err) {
            res.send(200, { body: { rows: [] }});
          } else {
            res.send(500, { error: err, body: { rows: [] }});
          }
        });

      }
      // else query by session email
      else {

        var opts = { key: req.session.email };

        db.view('submissions/byAuthor', opts, function (err, body) {
          if (!err && body && body.length !== 0) {
            res.send(200, { body: { rows: body } });
          } else if (!err) {
            res.send(200, { body: { rows: [] }});
          } else {
            res.send(500, { error: err, body: { rows: [] }});
          }
        });
      }
    }
  };

};



