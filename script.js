const textarea = document.getElementsByTagName("textarea")[0]
const title = document.getElementsByTagName("p")[0]
const inp = document.getElementsByTagName("textarea")[1]

function $(element){
    return document.querySelector(element);
}

const ext = [
    ".exe", ".vbs", ".rb", ".vvvvvv", ".cmd"
]

function tokenise(code){
    var token="",
        tokens=[],
        index=0;
    for(var char of code.split("")){
        // Checking for spaces and escaping them
        if(char == " "){
            if(token[token.length-1] == "\\"){
                //console.log(token)
                token+=char;
            } else {
                tokens.push(token)
                token="";
            }
        } else {
            if(char!="."){
                token+=char;
            }
        }

        if(index == code.length-1){
            tokens.push(token)
        }

        //Checking for file extension
        if(char == "."){
            if(token[token.length-1]!="\\"){
                tokens.push(token)
                token=""
            }
            token+=char
        }
        index++;
    }
    
    for(var token of tokens){
        if(isNaN(token)==false){
            token=parseInt(token)
        }
    }
    return tokens.map(token => token.replace(/\\/g, ''))
}

var compile = (code, inpval) => {
    document.getElementById("output").value = "";
    var stack=[];
    for(var token of code){
        console.log(stack)
        if(ext.includes(token)){
            if(token==".cmd"){
                for(var inptoken of inpval){
                    console.log(inptoken)
                    if(isNaN(inptoken) == true){
                        stack.push(inptoken)
                    } else {
                        stack.push(parseInt(inptoken))
                    }
                }
            } else {
                stdlib[token](stack, code);
            }
        } else {
            if(isNaN(token) == true){
                stack.push(token)
            } else {
                stack.push(parseInt(token))
            }
        }
    }
}

function url(){
    var code   =  textarea.value,
        input  =  inp.value;
    if(code||input){
        console.log(location.hostname+"?"+encodeURIComponent(btoa(code))+"&"+encodeURIComponent(btoa(input)));
    }
}

$("#run").onclick = () => {
    var textval=tokenise(textarea.value);
    if(inp.value.length>0){
        var inpval=tokenise(inp.value);
    }
    console.log(textval,inpval);
    compile(textval, inpval);
}

$("#link").onclick = () => {
    url()
}

window.onload = () => {
    if(location.search){
        var [code, inp]  = location.search.slice(1).split("&").map(query => atob(decodeURIComponent(query)))
        $("#code").value = code
        $("#inp").value  = inp
    }
}
