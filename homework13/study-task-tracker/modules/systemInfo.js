const os = require("os")
function systemInfo () {
    console.log('Operation system:', os.platform());
    console.log("Free memory", os.freemem())
    console.log("Working time", os.uptime())
    console.log("Quantity of CPU", os.cpus())
}
module.exports = {systemInfo}