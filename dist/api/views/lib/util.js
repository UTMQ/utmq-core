var getRevForDesign = function (design, db) {
  db.get(design, function(err, body) {
    console.log('\n************');
    console.log(err);
    console.log(body);
  });
};

exports.getRevForDesign = getRevForDesign;
