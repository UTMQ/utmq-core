module.exports = function (db) {

  db.save('_design/students', {
    views: {
      byEmail: {
        map: function (doc) {
          emit(doc.email, doc)
        }
      }
    }
  });

};
