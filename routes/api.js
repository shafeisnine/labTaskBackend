var express = require('express');
var publicRouter = require('./public');
var authRouter = require('./auth');
var productRouter = require('./product');
var tradeRouter = require('./trade');
var labelRouter = require('./label');
var languageRouter = require('./language');
var syllabusRouter = require('./syllabus');


var app = express();

app.use('/public/', publicRouter);
app.use('/auth/', authRouter);
app.use('/product/', productRouter);
app.use('/trade/', tradeRouter);
app.use('/label/', labelRouter);
app.use('/language/', languageRouter);
app.use('/syllabus/', syllabusRouter);


module.exports = app;
