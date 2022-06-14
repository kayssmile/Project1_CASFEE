/*  Todo_CASFEE :  Application
--------------------------------------------------------------*/
/*  Imports
--------------------------------------------------------------*/

import CSS from "../Styles/Stylesheet.scss";

import * as controller from "./controller/delegation";
import * as todos_services from "./controller/services/todos_service";
import * as render_services from "./view/render.js";



/*  App
--------------------------------------------------------------*/

async function app(){

    render_services.init();
    await todos_services.init_storage();
    render_services.renderList(todos_services.get_todos());
    window.addEventListener("click", controller.delegation_home);
   

}

app();
