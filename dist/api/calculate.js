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
    }

  }

};

