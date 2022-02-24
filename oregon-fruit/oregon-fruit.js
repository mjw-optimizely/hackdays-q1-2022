const { spawn } = require('child_process');

(async function main() {
  try {
    const output = await runCommand('node', ['stdsomething.js'])

    console.log('Out: ' + output.stdout)
    console.log('Err: ' + output.stderr)
  }
  catch (e) {
    console.error('main exception: ' + e)
  }
})()

//----------------------------------------------------------------------------
// runCommand
function runCommand(commandText, args) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(commandText, args);
    var error = false
    var out = ''
    var err = ''
    
    cmd.stdout.on('data', data => {
      out += data.toString()
    });

    cmd.stderr.on('data', data => {
      err += data.toString()
    });

    cmd.on('error', err => {
      var msg

      error = true

      if (err.errno === 'ENOENT') {
        msg = 'Didn\'t recognize the command "' + err.path + '"'
      }
      else {
        msg = 'Misc error: ' + JSON.stringify(err)
      }

      reject(msg)
    })

    cmd.on('exit', () => {
      if (!error) {
        resolve({stdout: out, stderr: err})
      }
    })
  })
}
