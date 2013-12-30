module.exports = function (db) {

  db.save('_design/submissions', {
    views: {
      byAuthor: {
        map: function (doc) {
          if (doc.author) {
            emit(doc.author, {
              problem_name: doc.problem_name,
              created_at: doc.created_at
            })
          }
        }
      },
      byProblem: {
        map: function (doc) {
          if (doc.problem) {
            emit(doc.problem, {
              author: doc.author,
              created_at: doc.created_at
            })
          }
        }
      }
    }
  });

};
