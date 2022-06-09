const textarea = document.getElementsByTagName("textarea")[0]
const title = document.getElementsByTagName("p")[0]
const inp = document.getElementsByTagName("textarea")[1]

const ext = [
    ".exe", ".vbs"
]

function run(code){
    var stack=[];
    var sus = /(\.\w+)/g
    var matchnt = /[^\.]+/
    stack.push(code.split(" ").map(token => token.match(matchnt)))
    stack.push(code.match(sus))
    console.log(stack)
    for(let i = 0; i < stack[0].length; i++){
        const match=stack[1]
        if(match != null){
            for(let j = 0; j < match.length; j++){
                if(ext.includes(match[j])){
                    if(match[j] == ".exe"){
                        console.log(stack[0][stack[0].length-1][0])
                        stack[0].pop()
                        console.log(stack)    
                    }
                    if(match[j] == ".vbs"){
                        console.log(parseInt(stack[0][stack[0].length-1])+parseInt(stack[0][stack[0].length-2]))
                    }
                }
            }
        } 
    }
}

document.addEventListener("click", evt => {
    if(evt.target.tagName=="BUTTON"){
        run(textarea.value)
    }
})
