const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT;

sequelize.sync()
  .then(() => app.listen(PORT, () =>
    console.log(`Backend at http://localhost:${PORT}`)
  ))
  .catch(err => console.error('Error while synchronizing DB:', err));
