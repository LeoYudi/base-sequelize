const express = require('express');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config();

require('./database');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof Error)
    return res.status(400).json({ error: err.message });

  console.log(err);
  return res.status(500).json({ error: 'internal server error' });
});

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`server running on port ${port}`));