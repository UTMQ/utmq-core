var setupViews = require('./views/problems');

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

      db.get(id, function (err, body) {
        if (!err) {
          res.send(200, body);
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



