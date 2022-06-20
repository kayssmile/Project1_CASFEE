import * as db_service from "../services/db_service.js";

function get_todos(req, res) {
  db_service.all(send_data);
  function send_data(todos) {
    if (todos == "db_error") {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.send(todos);
      res.end();
    }
  }
}

function new_todo(req, res) {
  if (!req.body) {
    res.status(400);
    res.send({ error: "No Content" });
  } else {
    res.status(404);
    db_service.add(req.body);
    res.end();
  }
}

function delete_todo(req, res) {
  if (!req.body) {
    res.status(400);
    res.send({ error: "No Content" });
  } else {
    db_service.del(req.params);
  }
  res.end();
}

function update_todo(req, res) {
  if (!req.body) {
    res.status(400);
    res.send({ error: "No Content" });
  } else {
    let result = db_service.update(req.body.id, req.body);
    if (result === "failure") {
      res.status(500);
    } else {
      res.status(200);
    }
    res.end();
  }
}

function del_todo(req, res) {
  if (!req.body) {
    res.status(400);
    res.send({ error: "No Content" });
  } else {
    db_service.del(req.body.todo_id);
    res.end();
  }
}

export { get_todos, new_todo, update_todo, del_todo, delete_todo };
