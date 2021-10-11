const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./database');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`server running on port ${port}`));