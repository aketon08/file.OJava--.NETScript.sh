const textarea = document.getElementsByTagName("textarea")[0]
const title = document.getElementsByTagName("p")[0]
const inp = document.getElementsByTagName("textarea")[1]

const ext = [
    ".exe", ".vbs", ".rb"
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
                token+=char
            }
        }
        index++;
    }
    return console.log(tokens.map(token => token.replace(/\\/g, '')))
}

document.addEventListener("click", evt => {
    if(evt.target.tagName=="BUTTON"){
        tokenise(textarea.value)
        //console.log(textarea.value)
    }
})
