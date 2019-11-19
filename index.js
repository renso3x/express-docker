require('dotenv/config');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./src/config/routes');
const winston = require('./src/config/winston');
const connectDB = require('./src/config/mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: winston.stream }));

routes(app);

const PORT = process.env.PORT;

const server = connectDB()
  .then(() => {
    console.log('Connected to DB.');
    app.listen(PORT, () => {
      console.log(`Server listening to port http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log('Error in connecting to database.', err));

module.exports = server;
