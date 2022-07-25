let output = document.getElementById("output")
var iterateVar;
outp=[];
function math(operand1, operand2, operator, stack=[]){
    switch (operator) {
        case "+":
            outp.push( operand1 + operand2 );
        case "-":
            outp.push( operand1 - operand2 );
        case "*":
            outp.push( operand1 * operand2 );
        case "/":
            outp.push( operand1 / operand2 );
        case "%":
            outp.push( operand1 % operand2 );
        case "^":
            outp.push( Math.pow(operand1, operand2) );
        default:
            outp.push( "Invalid operator" );
    }
    stack.pop()+stack.pop();
    return outp[0];
}
const stdlib = {
    ".txt"   : (stack)       => { compiled+=`output.value+=(${stack[stack.length-1]});` },
    ".vbs"   : (stack)       => { stack.push(math(stack[stack.length-2], stack[stack.length-1], "+", stack)); }, 
    ".rb"    : (stack, code) => { outp=[]; outp.push(stack[stack.length-2]-stack[stack.length-1]); stack.pop()+stack.pop();stack.push(outp[0]) },
    ".ts"    : (stack, code) => { outp=[]; outp.push(stack[stack.length-2]*stack[stack.length-1]); stack.pop()+stack.pop();stack.push(outp[0]) },
    ".tar"   : (stack, code) => { outp=[]; outp.push(stack[stack.length-2]/stack[stack.length-1]); stack.pop()+stack.pop();stack.push(outp[0]) },
    ".vvvvvv": (stack)       => { outp=[]; outp.push([stack.length-1].toLowerCase()) },
    ".r"     : (stack)       => { iterateVar = stack[stack.length-2]; compiled+=(`for(var ${stack[stack.length-2]} = 0; ${stack[stack.length-2]} < ${stack[stack.length-1]}; ${stack[stack.length-2]}++) {`) },
    ".zip"   : ()            => { compiled+="}" }
}
