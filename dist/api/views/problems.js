module.exports = function (db) {

  db.save('_design/problems', {
    views: {
      byName: {
        map: function (doc) {
          emit(doc.name, doc)
        }
      },
      byCourse: {
        map: function (doc) {
          if (doc.course) {
            emit(doc.name)
          }
        }
      }
    }
  });
};
