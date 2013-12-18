var gap = require('gap-system')({
  workspace: 'workspace'
});

module.exports = function () {


  var x = "<OMOBJ xmlns='http://www.openmath.org/OpenMath' version='2.0' cdbase='http://\www.openmath.org/cd'> <OMA> <OMS cd='arith221' name='plus'/> <OMI>3</OMI> <OMI>4</OMI> </OMA> </OMOBJ>";


  return {
    post: function (req, res, next) {
      console.log('CALCULATE');
      gap.calculate(x, function(err, resp) {

        if (!err) {
          res.send(200, {body: resp});
        } else {
          res.send(500, {body: err});
        }
      });
    }

  }

};

