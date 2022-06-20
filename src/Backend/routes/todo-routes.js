
import express from 'express';
const router = express.Router();

import * as rest_Controllers from '../controller/rest-controllers.js';


/* Routing
-------------------------------------------------------------- */

router.get("/get_todos", rest_Controllers.get_todos);
router.put("/new_todo", rest_Controllers.new_todo);
router.delete("/delete/todo/:id", rest_Controllers.delete_todo);
router.put("/update_todo", rest_Controllers.update_todo);

export const todo_Routes = router;
