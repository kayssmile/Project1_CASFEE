
/* New & Edit TODO
-------------------------------------------------------------- */



function delegation_TODO(function_flag, todoIndex, todos){

    const title_input = document.querySelector(".new__title--input");
    const importance_input = document.querySelector(".new__importance--input");
    const due_input = document.querySelector(".new__due--input");
    const complete_input = document.querySelector(".new__completed--input");
    const description_input = document.querySelector(".new__description--input");

    const form_todo = document.querySelector(".new");
    const id_todo = document.querySelector(".new_id");
    console.log(id_todo);
  //  id_todo.value = todos[todoIndex].id;
    title_input.value =  todos[todoIndex].Title;
    importance_input.value = todos[todoIndex].Importance;
    due_input.value = todos[todoIndex].Due;
    if(todos[todoIndex].Completed == 1){complete_input.checked = "true"};
    description_input.value = todos[todoIndex].Entry;

/** 
    <form class="new">
    <h2 class="new__headtitle"><span class="new__function">Edit </span><span class="new__id">#1</span></h2>
    <div class="new__title">
        <label for="new-title" class="new__title--label">Title</label>
        <input type="text" id="new-title" class="new__title--input" pattern="[A-z]">
    </div>
    <div class="new__importance">
        <label for="new-importance" class="new__importance--label">Importance</label>
        <input type="text" id="new-importance" class="new__importance--input" pattern="[A-z]">
    </div>
    <div class="new__due">
        <label for="new-inputdue" class="new__due--label">Due Date</label>
        <input type="date" id="new-editdue" class="new__due--input">
    </div>
    <div class="new__completed">
        <label class="new__completed--label" for="new-finished">Completed</label>
        <input class="new__completed--input" type="checkbox" id="new-finished" name="new-finished" value="new-finished">
    </div>
    <div class="new__description">
        <label for="new-inputdescription" class="new__description--label">Description</label>
        <textarea id="input-message" class="new__description--input"></textarea>
    </div>
    <button class="new__btn">Update</button>
    <button class="new__btn">Delete</button>
    <button class="new__btn">Create</button>
    <button class="new__btn">Overview</button>
</form>
 */



    if(!function_flag){
        

    }
    document.querySelector(".new").addEventListener("click", () =>{
        let element = event.target;
        if(element.matches(".list__item--btn2")){
            let todoId = event.target.parentNode.dataset.id;
            for(let x = 0; x < todos.length; x++){
                if(todos[x].id == todoId){
                    todos.splice(x,x); 
                }
            }
            
        }





        // return newtodo;





    })





 
}


export {delegation_TODO};