const textarea = document.getElementsByTagName("textarea")[0]
const title = document.getElementsByTagName("p")[0]
const inp = document.getElementsByTagName("textarea")[1]

const ext = [
    ".exe", ".vbs"
]

function compile(code){
    var stack=[];
    var sus = /(\.\w+)/g
    var matchnt = /(\w+)\./
    stack.push(code.split(" "))
    stack.push(code.match(sus))
    for(let i = 0; i < stack[0].length; i++){
        const match=stack[0][i].match(sus)
        if(match != null){
            for(let j = 0; j < match.length; j++){
                if(ext.includes(match[j])){
                    if(match[j] == ".exe"){
                        console.log(stack[0])    
                        console.log(stack[0][stack[0].length-1].match(matchnt)[1])
                        stack[0].pop()
                        console.log(stack)    
                    }
                    if(match[j] == ".vbs"){
                        console.log(parseInt(stack[0][stack[0].length-1].match(matchnt)[1])+parseInt(stack[0][stack[0].length-2]))
                    }
                }
            }
        } 
    }
}

document.addEventListener("click", evt => {
    if(evt.target.tagName=="BUTTON"){
        compile(textarea.value)
    }
})
