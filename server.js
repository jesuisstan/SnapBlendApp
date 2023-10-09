const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

//app.use('page1', express.static(path.resolve(__dirname, 'frontend')));
//app.use(express.static(path.resolve(__dirname, 'frontend')));
//app.use(express.static(path.resolve(__dirname, 'frontend', 'pages', 'home')));

app.use(express.static(path.resolve(__dirname, 'frontend'), { 'extensions': ['html', 'js'] }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/pages/home', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/pages/about', 'index.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/pages/gallery', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
