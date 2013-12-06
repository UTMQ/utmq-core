module.exports = function (db) {

  db.insert({
    "views":{
      "by_name": { "map": function(doc) { emit({
        name: doc.name,
        updated_at: doc.updated_at,
        created_at: doc.created_at,
        id: doc._id
      }); } }
    }

  }, '_design/submissions', function (error, response) {
    console.log(error);
    console.log(response);
  });

};
