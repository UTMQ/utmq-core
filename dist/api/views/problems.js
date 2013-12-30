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
            emit({
              name: doc.name,
              created_at: doc.created_at,
              due: doc.due
            })
          }
        }
      },
      byCourseAndPublished: {
        map: function (doc) {
          if (doc.course && doc.status === 'published') {
            emit({
              name: doc.name,
              created_at: doc.created_at,
              due: doc.due
            })
          }
        }
      }
    }
  });
};
