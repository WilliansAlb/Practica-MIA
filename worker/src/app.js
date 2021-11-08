const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const workerroutes = require('./routes/worker');

app.use('/math/',workerroutes);

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port));