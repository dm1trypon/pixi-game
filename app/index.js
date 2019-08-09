const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

router.get('/', (_req, res) => {
  res.sendFile(`${path.join(__dirname)}/express/index.html`);
});

router.get('/script/', (_req, res) => {
  res.sendFile(path.resolve('./dist/main.js'));
});

router.get('/player/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/player.png'));
});

router.get('/bullet/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/bullet.png'));
});

router.get('/scene/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/scene.jpg'));
});

router.get('/cursor/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/cursor.png'));
});

app.use('/', router);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
