import fs from 'fs';

// Ler o arquivo JSON completo
const data = JSON.parse(fs.readFileSync('all-cloudinary-urls.json', 'utf8'));

console.log('LISTA DE TODAS AS 154 URLS:\n');

// Mostrar apenas as URLs, uma por linha
data.allUrls.forEach((item) => {
  console.log(item.url);
});

console.log(`\nTotal: ${data.totalImages} URLs`);
