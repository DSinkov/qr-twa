const fs = require('fs');
try {
  fs.copyFileSync('./build/index.html', './build/200.html');
} catch (e) {
  console.log(e);
}
