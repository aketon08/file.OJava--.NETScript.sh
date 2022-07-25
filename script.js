const textarea = document.getElementsByTagName("textarea")[0]
const title = document.getElementsByTagName("p")[0]
const inp = document.getElementsByTagName("textarea")[1]

function $(el){
    return document.querySelector(el);
}

const ext = [
    ".txt", ".vbs", ".rb", ".vvvvvv", ".cmd", ".ts", ".tar", ".r", ".zip"
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

const lex = (code) => {
    var tokens=[],
        token="",
        index=0;
    for(var char of code.split("")) {
        if(char == "."){
            if(token[token.length-1]!="\\"){
                if(ext.includes(token)){
                    tokens.push({name:"command", value:token})
                    token="";
                } else if(token.includes("\"")) {
                    token=token.slice(1, -2)
                    console.log(token)
                    tokens.push({name:"string", value:token})
                    token="";
                } else {
                    tokens.push({name:"number", value:token})
                    token="";
                }
            }
            token+=char
        } else if(char == " "){
            if(token[token.length-1]=="\\"){
                token.slice(0, -1);
                console.log(token)
                token+=char;
            } else {
                if(ext.includes(token)){
                    tokens.push({name:"command", value:token})
                    token="";
                } else if(token.includes("\"")) {
                    token=token.slice(1, -2)
                    console.log(token)
                    tokens.push({name:"string", value:token})
                    token="";
                } else {
                    tokens.push({name:"number", value:token})
                    token="";
                }
            }
        } else {
            token+=char;
        }
        if(index == code.length-1){
            if(ext.includes(token)){
                tokens.push({name:"command", value:token})
                token="";
            } else if(token.includes("\"")) {
                token=token.slice(1, -2)
                console.log(token)
                tokens.push({name:"string", value:token})
                token="";
            } else {
                tokens.push({name:"number", value:token})
                token="";
            }
        }
        index++;
    }
    return tokens;
}

var compiled=[];
const compile = (code, inpval) => {
    var index=0;
    compiled=[];
    document.getElementById("output").value = "";
    var stack=[];
    console.log(code)
    for(var token of code){
        if(token.name=="command"){
            console.log(token.value)
            if(token.value==".cmd"){
                for(var inptoken of inpval){
                    console.log(inptoken)
                    if(isNaN(inptoken) == true){
                        stack.push(inptoken)
                    } else {
                        stack.push(parseInt(inptoken))
                    }
                }
            } else {
                console.log(stdlib[token.value](stack));
            }
        } else {
            if(token.name=="string"){
                stack.push(token.value)
            } else {
                stack.push(parseInt(token.value))
            }
        }
        if(index==code.length-1){
            eval(compiled)
        }
        console.log(compiled)
        index++;
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
    var textval=lex(textarea.value);
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

document.addEventListener("keydown", evt => {
    if(evt.key=="Enter"&&(evt.ctrlKey||evt.metaKey)) {
        var textval=lex(textarea.value);
        if(inp.value.length>0){
            var inpval=tokenise(inp.value);
        }
        console.log(textval,inpval);
        compile(textval, inpval);
    }
})
