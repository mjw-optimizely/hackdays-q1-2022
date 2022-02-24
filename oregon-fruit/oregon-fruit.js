const { spawn } = require('child_process');

(async function main() {
  const ls = spawn('ls', ['-ltr']);

  ls.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  ls.stderr.on('data', (data) => {
    console.error('stderr: ' + data);
  });

  ls.on('error', error => {
    if (error.errno === 'ENOENT') {
      console.error('Didn\'t recognize the command "' + error.path + '"')
    }
    else {
      console.error('Misc error: ' + JSON.stringify(error))
    }
  })

  ls.on('exit', () => {
    process.exit()
  })

  await new Promise(r => setTimeout(r, 2000));
})()
