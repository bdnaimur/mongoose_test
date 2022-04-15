const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const router = require('./router/bank.router')
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');

mongoose.connect('mongodb+srv://test:mynLgWTmeUsAVGYw@cluster0.esvfp.mongodb.net/task_manager')
mongoose.connection.once('open', () =>
  console.log('\x1b[34m%s\x1b[0m', 'Connected to Database.')
);

const apiYamlFile = YAML.load('api.yaml');

const port = 5000;

const app = express();
app.use(express.json())
app.use(cors());


app.get('/', (req, res) => {
    res.send(
      '<h3 style="margin-top: 50px; text-align: center">Goto <a href="http://localhost:5000/api-docs">http://localhost:5000/api-docs</a> for API documentation</h3>'
    );
  });

  app.use('/bank', router);

  /** Swagger */
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiYamlFile));

app.listen(port, ()=>{
    console.log("app is listening to " + port);
})