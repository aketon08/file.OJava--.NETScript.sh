const textarea = document.getElementsByTagName("textarea")[0]
const title = document.getElementsByTagName("p")[0]
const inp = document.getElementsByTagName("textarea")[1]
var stack=[];
function compile(code){
    code=code.split(" ")
    for(let i = 0; i < code.length; i++){
        stack+=code[i]
        console.log(stack)
    }
}

document.addEventListener("click", evt => {
    if(evt.target.tagName=="BUTTON"){
        compile(textarea.value)
    }
})