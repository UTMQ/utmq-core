var slug = require('slug');
var sanitize = require('validator').sanitize;
var xss = require('sanitizer');

var setupViews = require('./views/courses');

module.exports = function (dbConn) {
  var db = dbConn.database('utmq-core-courses');

  setupViews(db);

  return {
    post: function (req, res, next) {
      console.log('POST');
      var name = sanitize(xss.sanitize(req.body.name)).trim();
      var doc = {
        name: name,
        created_at: new Date(),
        updated_at: new Date(),
        slug: slug(name).toLowerCase()
      };
      if (name.length > 0) {
        db.save(doc, function (err, body) {
          res.contentType = 'json';
          if (!err) {
            res.send({
              result: body
            });
          } else {
            res.send(500, {
              error: true,
              result: err
            });
          }
        });
      } else {
        res.send(500);
      }

    },
    put: function (req, res, next) {
      console.log('PUT');
      console.log(req);

    },
    getAll: function (req, res, next) {
      db.view('courses/byName', function (err, body) {
        if (!err && body && body.length !== 0) {
          res.send(200, { body: { rows: body } });
        } else if(!err) {
          res.send(200, { error: err, body: { rows: [] }});
        } else {
          res.send(500, { error: err, body: { rows: [] }});
        }
      });
    },

    del: function (req, res, next) {
      var id = req.params.id;
      db.get(id, function (err, body) {
        if (!err) {
          db.remove(body._id, body._rev, function (err) {
            if (!err) {
              res.send(200);
            } else {
              console.log(err);
              res.send(500);
            }
          });

        } else {
          res.send(500);
        }

      });

    }
  };

};




 



