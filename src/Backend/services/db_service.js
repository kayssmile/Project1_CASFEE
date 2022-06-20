import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/todos.db', autoload: true});

function add(todo){
    db.insert(todo, function (err, newDoc) { 
        if (newDoc) {
            return "Success";
        }else{
            return "failure";
        }
    });
}

function update(todoid, todo){
    db.update({"id":todoid}, {"id":todo.id,"Title":todo.Title,"Entry":todo.Entry,"Importance":todo.Importance,"Due":todo.Due,"Completed":todo.Completed}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
        if (doc) {
            return "Success";
        }else{
            return "failure";
        }
    });
}

function del(todo_id){
    db.remove({"id":parseInt(todo_id.id)}, {}, function (err, numRemoved) {
        if (numRemoved) {
            return "Success";
        }else{
            return "failure";
        }
      });
}

function all(callback) {
    db.find({}, function (err, docs) {
    if(err){return "db_error";}
    return callback(docs);
    });
}

export {add, update, del, all}