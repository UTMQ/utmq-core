module.exports = function (db) {

  db.save('_design/submissions', {
    views: {
      byName: {
        map: function (doc) {
          emit(doc.name, doc)
        }
      }
    }
  });

};
