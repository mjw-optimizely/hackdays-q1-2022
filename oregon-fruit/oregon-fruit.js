const { spawn } = require('child_process');

(async function main() {
  try {
    const out = await runCommand('ls', ['-ltr'])
    console.log(out)
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

    cmd.stdout.on('data', data => {
      resolve(data.toString())
    });

    // TODO: Do I need stderr? How would I handle a case with both stdout and stderr?

    cmd.on('error', err => {
      var msg

      if (err.errno === 'ENOENT') {
        msg = 'Didn\'t recognize the command "' + err.path + '"'
      }
      else {
        msg = 'Misc error: ' + JSON.stringify(err)
      }

      reject(msg)
    })

    // cmd.on('exit', () => {
    //   // Unsure if I need this or not
    // })
  })
}
