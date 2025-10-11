const fs = require('fs');
const path = require('path');

const siteUrl = 'https://hyperpop.netlify.app';
const outputDir = '_site';

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (path.extname(file) === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function generateSitemap() {
  const htmlFiles = getAllHtmlFiles(outputDir);
  
  const urls = htmlFiles.map(file => {
    const relativePath = file.replace(outputDir, '').replace('/index.html', '/');
    const url = `${siteUrl}${relativePath}`;
    const stats = fs.statSync(file);
    const lastmod = stats.mtime.toISOString();
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
  });
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
  
  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated!');
}

generateSitemap();
