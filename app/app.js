const express = require('express');
const app = express();
const path = require('path');
const env = require('dotenv');
const cors = require('cors');

const methodOverride = require('method-override');
env.config();
const routes = require('./routes/routes');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(routes);
app.listen(process.env.PORT || 8002, function () {
    console.log('connected!');
    });
