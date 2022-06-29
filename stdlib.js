let output = document.getElementById("output")
var outp = [];
var iterateVar;
const stdlib = {
    ".txt"   : (stack)       => { compiled+=`output.value+=(${stack[stack.length-1]});` },
    ".vbs"   : (stack)       => { outp=[]; outp.push(stack[stack.length-2]+stack[stack.length-1]); stack.pop()+stack.pop();stack.push(outp[0]) }, 
    ".rb"    : (stack, code) => { outp=[]; outp.push(stack[stack.length-2]-stack[stack.length-1]); stack.pop()+stack.pop();stack.push(outp[0]) },
    ".ts"    : (stack, code) => { outp=[]; outp.push(stack[stack.length-2]*stack[stack.length-1]); stack.pop()+stack.pop();stack.push(outp[0]) },
    ".tar"   : (stack, code) => { outp=[]; outp.push(stack[stack.length-2]/stack[stack.length-1]); stack.pop()+stack.pop();stack.push(outp[0]) },
    ".vvvvvv": (stack)       => { outp=[]; outp.push([stack.length-1].toLowerCase()) },
    ".r"     : (stack)       => { iterateVar = stack[stack.length-2]; compiled+=(`for(var ${stack[stack.length-2]} = 0; ${stack[stack.length-2]} < ${stack[stack.length-1]}; ${stack[stack.length-2]}++) {`) },
    ".zip"   : ()            => { compiled+="}" }
}
