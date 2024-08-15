let { fork } = require('child_process')
let serverProcess = fork(__dirname + '/server.js')