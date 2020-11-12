import express from 'express';

import routes from './src/routes';

const app = express();

app.use(express.json(), routes)

app.listen(5000, () => {
  console.log("server running");
})