const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// MongoDB connection

mongoose.connect('mongodb+srv://hrithikgudapati:mongoose@hrithikgudapati4.4pacbfk.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(productRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use((req, res, next) => {
  res.status(404).send('Page not found');
});


app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
