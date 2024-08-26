function vm(proto) {
    const { Instructions, Constants } = proto;
    return (async (...arguments) => {
        const stack = [];
        const fast = {};
        let PC = 0;
        while (true) {
            const { opcode, cIndex } = Instructions[PC];
            PC++;

            switch (opcode) {
                case 1: // POP_TOP
                    stack.pop();
                    break;
                case 151: // RESUME
                    break;
                case 100: // LOADCONST
                    stack.push(Constants[cIndex]);
                    break;
                case 108: // IMPORT_NAME
                    stack.push(require(Constants[cIndex]));
                    break;
                case 2: // PUSH_NULL
                    stack.push(null);
                    break;
                case 132: // CREATE_FUNCTION
                    stack.push(vm(stack.pop()));
                    break;
                case 90: // STORE_NAME
                    global[Constants[cIndex]] = stack.pop();
                    break;
                case 101: // LOAD_NAME 
                    stack.push(global[Constants[cIndex]]);
                    break;
                case 116: // LOAD_GLOBAL
                    stack.push(global[Constants[cIndex]]);
                    break;
                case 106: // LOAD_ATTR
                    let x = stack.pop();
                    stack.push(x[Constants[cIndex]]);
                    break;
                case 124: // LOAD_FAST
                    stack.push(fast[Constants[cIndex]] || arguments.shift());
                    break;
                case 125: // STORE_FAST
                    fast[Constants[cIndex]] = stack.pop();
                    break; 
                case 105: // BUILD_MAP
                    const map = {};
                    for (let i=0; i < Constants[cIndex] * 2; i+=2) {
                        const value = stack.pop();
                        const index = stack.pop();
                        map[index] = value; 
                    }
                    stack.push(map);
                    break;
                case 156: // BUILD_CONST_KEY_MAP
                    const keys = stack.pop().reverse();
                    const amap = {};
                    for (let i=0; i < Constants[cIndex]; i++) {
                        amap[keys[i]] = stack.pop();
                    }
                    stack.push(amap);
                    break;
                case 171: // CALL
                    /*
                        - Func or Null
                        - Self or Null
                        - Arguments
                    */
                    const args = [];
                    for (let i=0; i < Constants[cIndex]; i++) {
                        args.push(stack.pop());
                    }

                    const self = stack.pop() || stack.pop();
                    stack.push(await self(...args.reverse()));
                    break;
                case 122: // BINARY_OP
                    const right = stack.pop();
                    const left = stack.pop();
                    let out;

                    switch (Constants[cIndex]) {
                        case 0: // ADD
                            out = left + right;
                            break;
                        case 10: // SUB
                            out = left - right;
                            break;
                        case 6: // MOD
                            out = left % right;
                            break;
                        case 3: // LSHIFT
                            out = left << right;
                            break;
                        case 9: // RSHIFT
                            out = left >> right;
                            break;
                    }

                    stack.push(out);
                    break;
                case 107: // COMPARE_OP
                    const lleft = stack.pop();
                    const rright = stack.pop();
                    let oout;

                    switch (Constants[cIndex]) {
                        case 0:
                            oout = lleft == rright;
                            break;
                        case 1:
                            oout = lleft != rright;
                            break;
                    }

                    stack.push(oout);
                    break;
                case 114: // POP_JUMP_IF_FALSE
                    if (!stack.pop()) {
                        PC = Constants[cIndex];
                    }
                    break;
                case 121: // RETURN_CONST
                    return Constants[cIndex];
                case 83:
                    return stack.pop();
                default:
                    console.log("Unsupported opcode:", opcode);
            }
        }
    });
} 

module.exports = vm;