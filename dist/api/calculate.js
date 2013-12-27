var lib = require('./lib/calculate');

module.exports = function (settings) {
  var gap = require('gap-system')({
    path: settings.gapPath,
    workspace: 'workspace'
  });

  return {
    post: function (req, res, next) {
      gap.calculate(req.body.om, function(err, resp) {

        if (!err) {
          res.send(200, {body: resp});
        } else {
          res.send(500, {body: err});
        }
      });
    },
    calculateForQuestion: function(req, res, next) {
      // TODO: block endpoint under session.
      var data = {
        problem: req.body.problem,
        questionId: req.body.questionId,
        gap: gap,
        session: req.session
      };

      lib.getResultForQuestion(data, function(err, result) {
        if (!err) {
          res.send(200, {body: result});
        } else {
          res.send(500, {body: err});
        }
      });


    }

  }

};

