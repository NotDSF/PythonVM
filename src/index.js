const { exec } = require("child_process");
const vm = require("./modules/vm");
const precompute = require("./modules/precompute");
const path = require("path");

exec(`python ${path.join(__dirname, "modules/compile.py")}`, (error) => {
    if (error) {
        throw error;
    }

    const data = require("../out.json");
    vm(precompute(data))();
});
