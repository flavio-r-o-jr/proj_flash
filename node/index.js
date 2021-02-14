const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

requireDir('./src/models');
mongoose.connect('mongodb://localhost:27017/exercicio', {useNewUrlParser: true});

app.use(express.json());
app.use(cors());
app.use('/sistema', require('./src/routes/routes'));
app.listen(3005);

