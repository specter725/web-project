//Install the required dependencies. Run the following command in your project directory:

npm install express mongoose body-parser

//Create a server.js file in the root directory of your project.

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model('Item', ItemSchema);

// API routes
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.json(item);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    item.title = req.body.title;
    item.description = req.body.description;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// we're using mongoose to interact with the MongoDB database. 
//We define a ItemSchema that specifies the fields for each item in the database. We create an Item model based on this schema.

//The API routes handle HTTP GET, POST, PUT, and DELETE requests to the /api/items endpoint. 
//The async/await syntax is used to handle promises returned by mongoose methods.
// The routes respond with appropriate status codes and JSON responses.

//Start the server by running node server.js in the terminal. This will start the server on http://localhost:5000/api/items.