const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (_req, res) => {
  res.sendFile(`${path.join(__dirname)}/express/index.html`);
});

router.get('/script/', (_req, res) => {
  res.sendFile(path.resolve('./dist/main.js'));
});

router.get('/player/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/player.png'));
});

router.get('/blaster/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/blaster.png'));
});

router.get('/machineGun/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/machine_gun.png'));
});

router.get('/plazma/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/plazma.png'));
});

router.get('/scene/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/scene.jpg'));
});

router.get('/cursor/', (_req, res) => {
  res.sendFile(path.resolve('./app/img/cursor.png'));
});

router.get('/explosion/:idImg', ({params}, res) => {
  const {idImg} = params;

  if (!idImg) {
    return;
  }

  const fileName = `./app/img/explosion/explosion${idImg}.png`;
  
  if (!fs.existsSync(fileName)) {
    return;
  }

  res.sendFile(path.resolve(`./app/img/explosion/explosion${idImg}.png`));
});

app.use('/', router);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
