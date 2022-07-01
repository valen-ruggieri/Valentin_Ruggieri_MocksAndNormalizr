

const express = require('express');
const routerMock = require('./router/productsMock');
const app = express();
const path = require('path');
const routerNormalizr = require('./router/chatNormalize');

app.use(express.static('src/public'))
app.set('views',path.join(__dirname+'/public/views'))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api',routerMock)
app.use('/api',routerNormalizr)


module.exports= app;