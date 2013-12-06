module.exports = function (db) {

  db.insert({
    "views":{
      "by_name": { "map": function(doc) { emit({
        name: doc.name,
        created_at: doc.created_at,
        id: doc._id
      }); } }
    }

  }, '_design/instructors', function (error, response) {
    console.log(error);
    console.log(response);
  });

};
