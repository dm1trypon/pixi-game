const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(`${path.join(__dirname)}/express/index.html`);
});

router.get('/script/', (req, res) => {
  res.sendFile(path.resolve('./dist/main.js'));
});

router.get('/player/', (req, res) => {
  res.sendFile(path.resolve('./app/img/player.png'));
});

router.get('/bullet/', (req, res) => {
  res.sendFile(path.resolve('./app/img/bullet.png'));
});

app.use('/', router);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
