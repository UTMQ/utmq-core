module.exports = function (db) {

  db.save('_design/instructors', {
    views: {
      byEmail: {
        map: function (doc) {
          emit({admin: doc.admin })
        }
      }
    }
  });

};
