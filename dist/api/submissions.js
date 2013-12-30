var setupViews = require('./views/submissions');

module.exports = function (dbConn) {
  var db = dbConn.database('utmq-core-submissions');

  setupViews(db);

  return {
    post: function (req, res, next) {
      var sub = req.body;
      sub.created_at = new Date();
      sub.author = req.session.email;
      // TODO: check if existing for this problem id
        // set redo, don't set marks.

      db.save(sub, function (err, body) {
        if (!err) {
          res.send({ result: body });
        } else {
          res.send(500, { result: err });
        }
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



