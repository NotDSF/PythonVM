import dis, json

ifile = open("input.py", "r")
bytecode = dis.Bytecode(compile(ifile.read(), filename="", mode="exec"))

def deserialize(bytecode):
    instructions = []
    for inst in bytecode:
        argval = inst.argval
        if (type(inst.argval).__name__ == "code"):
            argval = deserialize(dis.Bytecode(inst.argval))

        instructions.append({
            "opcode": inst.opcode,
            "opname": inst.opname,
            "argval": argval,
            "offset": inst.offset
        })
    return instructions

out = open("out.json", "w")
out.write(json.dumps(deserialize(bytecode), indent=4))