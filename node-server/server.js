const bodyParser = require('body-parser');
const express = require('express');
const { isProduction } = require('./util/util.js');
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

if (isProduction) {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    path.resolve(__dirname, 'react-client', 'build', 'index.html');
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.export = app;
