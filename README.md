# Python Virtual Machine
Virtual machine for Python 3.12.5, made in pure JavaScript.

## Supported Opcodes
- POP_TOP
- RESUME
- LOADCONST
- IMPORT_NAME
- PUSH_NULL
- CREATE_FUNCTION
- STORE_NAME
- LOAD_NAME
- LOAD_GLOBAL
- LOAD_ATTR
- LOAD_FAST
- STORE_FAST
- BUILD_MAP
- BUILD_CONST_KEY_MAP
- CALL
- BINARY_OP
- COMPARE_OP
- POP_JUMP_IF_FALSE
- RETURN_CONST

## Runtime Environment
This doesn't support the native python library for obvious reasons, however you have full access to the JavaScript Environment