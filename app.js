const config = require('./config');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const apiResponse = require('./helpers/apiResponse');
const cors = require('cors');
const mongoose = require('./services/mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const bodyParser = require('body-parser')

// DB connection
mongoose.connect();

var app = express();

//don't show the log when it is test
if (config.env !== 'test') {
  app.use(morgan('combined'));
}

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/files/asset',
  express.static(path.join(__dirname + '/files/asset'))
);

//To allow cross-origin requests 
app.use(cors());

//Route Prefixes
app.use('/', indexRouter);
app.use('/api/', apiRouter);

var options = {
  explorer: true,
};
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

// throw 404 if URL not found
app.all('*', function (req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found');
});

app.use((err, req, res) => {
  if (err.name == 'UnauthorizedError') {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;
