module.exports = function (db) {

  db.save('_design/courses', {
    views: {
      byName: {
        map: function (doc) {
          emit(doc.name)
        }
      }
    }
  });
};
