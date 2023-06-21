const Koa = require('koa');
const koaBody = require('koa-body');
const routes = require('./routes/routes.js');
const render = require('koa-ejs');
const path = require('path');
const mongoose = require('mongoose');


const app = new Koa();

mongoose.connect('mongodb://localhost:27017/koadb');

render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
});

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(3000);