const express = require('express');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors')
const swaggerOptions = require('./src/swagger.json')
const routes = require('./src/routes');

const app = express();

app.use(cors())

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerOptions));

app.use(express.json(), routes)

app.listen(5000, () => {
  console.log("server running");
})
