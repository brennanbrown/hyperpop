const fs = require('fs');
const path = require('path');
const Terser = require('terser');
const CleanCSS = require('clean-css');

// Minify JS files
async function minifyJS() {
  const jsDir = path.join(__dirname, '../_site/assets/js');
  const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
  
  for (const file of files) {
    const filePath = path.join(jsDir, file);
    const code = fs.readFileSync(filePath, 'utf8');
    
    const result = await Terser.minify(code, {
      compress: true,
      mangle: true,
      format: {
        comments: false
      }
    });
    
    if (result.error) {
      console.error(`Error minifying ${file}:`, result.error);
      continue;
    }
    
    fs.writeFileSync(filePath, result.code);
    console.log(`Minified ${file}`);
  }
}

// Minify CSS files
function minifyCSS() {
  const cssDir = path.join(__dirname, '../_site/assets/css');
  const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
  
  const cleanCSS = new CleanCSS({
    level: 2,
    returnPromise: true
  });
  
  for (const file of files) {
    const filePath = path.join(cssDir, file);
    const code = fs.readFileSync(filePath, 'utf8');
    
    cleanCSS.minify(code).then(result => {
      if (result.errors.length) {
        console.error(`Error minifying ${file}:`, result.errors);
        return;
      }
      
      fs.writeFileSync(filePath, result.styles);
      console.log(`Minified ${file}`);
    });
  }
}

// Run minification
console.log('Minifying assets...');
minifyJS();
minifyCSS();
console.log('Minification complete!');
