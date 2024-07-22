const { exec } = require('child_process');

exec('ln -sf /usr/bin/python3 /usr/bin/python', (error, stdout, stderr) => {
  if (error) {
    if (stderr.includes('File exists')) {
      console.log('Symlink already exists, skipping creation.');
    } else {
      console.error(`Error creating symlink: ${stderr}`);
      process.exit(1);
    }
  } else {
    console.log('Symlink created successfully.');
  }
});
