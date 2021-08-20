const express = require('express');
const app = express();
const path = require('path');
const env = require('dotenv');
env.config();

const methodOverride = require('method-override');

const routes = require('./routes/routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(routes);
app.listen(process.env.PORT || 8002, function () {
    console.log('connected!');
    });
