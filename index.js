const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const config = require('./config/config')
const apiRoutes = require('./routes/api');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000,
}));
app.use(express.static('public'))

app.use('/api', apiRoutes);

app.listen(config.port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", config.port);
 });