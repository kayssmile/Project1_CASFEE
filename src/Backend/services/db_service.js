
import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/todos.db', autoload: true});

// await db.loadDatabaseAsync();



class todo{
    constructor(Title, Entry, Importance, Due, Completed) {

        this.Title = Title;
        this.Entry = Entry;
        this.Importance = Importance;
        this.Due = Due;
        this.Completed = Completed;
        this.Created = new Date(); 

    }
}

class dbservice{
    constructor() {

    }
    add(todo){
        db.insert(todo, function (err, newDoc) {
            if (newDoc) {
                return "Success";
            }else{
                return "failure";
            }
        });
    }
    update(todoid, todo){
        db.update({id: todoid}, {todo}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
          //  callback(err, doc);


          console.log(err);
          console.log(numDocs);
          console.log(doc);

        });
    }
    delete(todo_id){
        console.log(todo_id);
        db.remove({ id: todo_id }, {}, function (err, numRemoved) {
           console.log(numRemoved);
          });
    }
    all(callback) {
        db.find({}, function (err, docs) {
            if(err){return "db_error";}
            return callback(docs);
        });
    }
}

// export const todo_storage = new todos_db();

export const storage = new dbservice();

// todo_storage.add(todos);

