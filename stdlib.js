let output = document.getElementById("output")
var outp = [];
const stdlib = {
    ".exe"   : (stack, code) => { if(outp.length>0) {output.value+=outp+" "; if(stack.length){stack.pop()}} if (stack.length) { {output.value+=stack[stack.length-1]+" "; stack.pop()} } },
    ".vbs"   : (stack, code) => { if(code.includes(".exe")) { outp=[];outp.push(stack[stack.length-2]+stack[stack.length-1] );stack.pop() } else { output.value+=stack[stack.length-2]+stack[stack.length-1] } stack.pop() }, 
    ".rb"    : (stack, code) => { if(code.includes(".exe")) { outp=[];outp.push(stack[stack.length-2]-stack[stack.length-1] );stack.pop() } else { output.value+=stack[stack.length-2]-stack[stack.length-1] } stack.pop() },
    ".ts"    : (stack, code) => { if(code.includes(".exe")) { outp=[];outp.push(stack[stack.length-2]*stack[stack.length-1] );stack.pop() } else { output.value+=stack[stack.length-2]*stack[stack.length-1] } stack.pop() },
    ".tar"   : (stack, code) => { if(code.includes(".exe")) { outp=[];outp.push(stack[stack.length-2]/stack[stack.length-1] );stack.pop() } else { output.value+=stack[stack.length-2]/stack[stack.length-1] } stack.pop() },
    ".vvvvvv": (stack)       => { outp=stack[stack.length-1].toLowerCase() },
    ".r"     : (stack)       => { var compiled=[]; compiled+=(`for(var ${stack[stack.length-2]} = 0; ${stack[stack.length-2]} < ${stack[stack.length-1]}; ${stack[stack.length-2]}++) {console.log("test", ${stack[stack.length-2]})}`); eval(compiled) }
}
