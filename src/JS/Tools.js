/* Project : Tools
-------------------------------------------------------------- */
/* Tools : Dependencies                                                                                                                                                                         Head Heart Web <3 Consult your WebDoc about Middleware, Margin and Padding 
-------------------------------------------------------------- */
 
// import { GraphQLClient, gql } from 'graphql-request';

/* Tools: Imports, Declarations, Selectors
-------------------------------------------------------------- */

var new_todo_flag = 0;
var filter_flag = 0;





/* Home : Delegation
-------------------------------------------------------------- */

function delegation_home(event){

    let element = event.target;
    console.log(element);



    if(element.matches(".header__moon") || element.matches(".header__moonpath")){
        document.querySelector(".header__moon").style.display = "none";
        document.querySelector(".header__sun").style.display = "inline-block";
        document.querySelector(".header").style.backgroundColor = "rgb(0, 0, 0)";
        document.querySelector(".header__text").style.color = "white";

    }
    if(element.matches(".header__sun") || element.matches(".header__sunpath")){
        document.querySelector(".header__moon").style.display = "inline-block";
        document.querySelector(".header__sun").style.display = "none";
        
        document.querySelector(".header").style.backgroundColor = "rgb(251, 226, 2)";
        document.querySelector(".header__text").style.color = "black";
    }
    if(element.matches(".new__btn")){
        if(new_todo_flag === 0){
            element.parentNode.children[1].style.marginTop = "10px";
            element.parentNode.children[1].style.zIndex = "11";
            document.querySelector(".new__btn--svg").style.transform = "rotate(180deg)";
            new_todo_flag = 1;
        }else{
            element.parentNode.children[1].style.marginTop = null;
            setTimeout(() =>{
                element.parentNode.children[1].style.zIndex = null;
            }, 2000)
            document.querySelector(".new__btn--svg").style.transform = "rotate(0deg)";
            new_todo_flag = 0;
        }
    }
    if(element.matches(".filter__btn") || element.matches(".filter__btn--text") || element.matches(".filter__btn--svg") || element.matches(".filter__btn--svgpath")){
        
        if(element.matches(".filter__btn")){
            element = element.parentNode.children[1];
        }
        else if(element.matches(".filter__btn--text")){
            element = element.parentNode.parentNode.children[1];
        }
        else if(element.matches(".filter__btn--svg")){
            element = element.parentNode.parentNode.children[1];
        }
        else if(element.matches(".filter__btn--svgpath")){
            element = element.parentNode.parentNode.parentNode.children[1];
        }
        
        if(filter_flag === 0){
            document.querySelector(".filter__btn--svg").style.transform = "rotate(180deg)";
            element.style.marginTop = "10px";
            filter_flag = 1;
        }else{
            document.querySelector(".filter__btn--svg").style.transform = "rotate(0deg)";
            element.style.marginTop = null;
            filter_flag = 0;
        }
    
    }
       
        
       
    
}



 




/*  Home : Scroll - Functions
-------------------------------------------------------------- */



/*  Home : Functions
-------------------------------------------------------------- */








export {delegation_home};


