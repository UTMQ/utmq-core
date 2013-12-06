var slug = require ('slug');
var sanitize = require('validator').sanitize;
var xss = require('sanitizer');
var setupViews = require('./views/courses');

module.exports = function (nano) {
  var db = nano.use('utmq-core-courses');

  setupViews(db);

  return {
    post: function (req, res, next) {
      console.log('POST');
      var name = sanitize(xss.sanitize(req.body.name)).trim();
      var doc = {
        name: name,
        created_at: new Date(),
        updated_at: new Date(),
        slug: slug(name)
      };
      if (name.length > 0) {
        db.insert(doc, function (err, body) {
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
    get: function (req, res, next) {
      console.log('GET');
      db.list(function (err, body) {
        if (!err) {
          body.rows.forEach(function (doc) {
            res.send(body);
            console.log(doc);
          });
        } else {
          console.log(err);
        }
      });
    },

    getAll: function (req, res, next) {
      console.log('GET ALL');
      res.contentType = 'json';

      db.view('courses', 'by_name', function (err, body) {
        if (!err && body && body.rows.length !== 0) {
          res.send({ error: false, body: body});
        } else {
          res.send(500, { error: true, body: err});
        }
      });
    },

    del: function (req, res, next) {
      console.log('DEL');


      var id = req.params.id;
      console.log(id);
      db.get(id, function (err, body) {
        console.log(err);
        console.log(body);
        if (!err) {

          db.destroy(body._id, body._rev, function (err) {
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




 



