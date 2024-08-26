function precompute(proto) {
    const Instructions = [];
    const Constants = [];
    const Proto = {
        Constants,
        Instructions
    }

    for (let { opcode, opname, argval } of proto) {
        let cIndex = 0;

        switch (opname) {
            case "LOAD_CONST": // MAKE_FUNCTION -> stack.push(func)
                if (typeof(argval) !== "object" || !argval.find(obj => typeof(obj) == "object")) {
                    break;
                }
                argval = precompute(argval);
                break;
            case "POP_JUMP_IF_FALSE":
                argval = proto.indexOf(proto.find((instr) => instr.offset === argval )) - 1;
                break;
            case "COMPARE_OP":
                switch (argval) {
                    case "==":
                        argval = 0;
                        break;
                    case "!=":
                        argval = 1;
                        break;
                }
                break;
        }

        if (argval !== null) {
            if (!Constants.find(constant => constant === argval)) {
                cIndex = Constants.push(argval) - 1;
            } else {
                cIndex = Constants.indexOf(argval);
            }
        } else {
            cIndex = -1;
        }

        Instructions.push({ opcode, cIndex })
    }

    return Proto;
}


module.exports = precompute;