//Install the MongoDB Node.js driver. Run the following command in your project directory:

npm install mongodb

//Create a db.js file in the root directory of your project.

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/mydb';

const connectDb = async () => {
  let client;
  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    return client.db();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDb;

//we're using the MongoClient class from the mongodb package to connect to the MongoDB database. 
//We define the url of the database, The connectDb function returns the database object, which can be used to interact with the database.


//In server.js, import the connectDb function and use it to connect to the database.

const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./db');

const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB database
connectDb()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error(err);
  });

// ...API routes and server code

//Start the server by running node server.js in the terminal. T
//his will connect to the MongoDB database and start the server on http://localhost:5000/api/items.