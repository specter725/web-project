//In server.js, import the express and mongodb packages, and create an instance of Express:

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

//Define the routes for the API, with appropriate HTTP methods, to perform CRUD operations on the items collection in the MongoDB database

// Get all items
app.get('/api/items', async (req, res) => {
    const items = await db.collection('items').find().toArray();
    res.json(items);
  });
  
  // Get a single item by ID
  app.get('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await db.collection('items').findOne({ _id: ObjectId(id) });
    res.json(item);
  });
  
  // Create a new item
  app.post('/api/items', async (req, res) => {
    const newItem = req.body;
    const result = await db.collection('items').insertOne(newItem);
    res.json(result.ops[0]);
  });
  
  // Update an existing item by ID
  app.put('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    const result = await db
      .collection('items')
      .updateOne({ _id: ObjectId(id) }, { $set: update });
    res.json(result.modifiedCount > 0);
  });
  
  // Delete an item by ID
  app.delete('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    const result = await db.collection('items').deleteOne({ _id: ObjectId(id) });
    res.json(result.deletedCount > 0);
  });

  //Start the server and connect to the MongoDB database:

  // Start the server
app.listen(5000, () => {
    console.log('Server started on port 5000');
  });
  
  // Connect to the MongoDB database
  MongoClient.connect('mongodb://localhost:27017/mydb', (err, client) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    db = client.db();
    console.log('Connected to MongoDB');
  });

  