import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import { router } from './routes/indexRoute.js';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, error => {
  if (error) {
    console.error('Failed to start server: ', error);
    throw error;
  }
  console.log(`Runnig in http://localhost:${port}`);
});
