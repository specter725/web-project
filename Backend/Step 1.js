//Step 1. Design a user interface for a simple CRUD app using React function components and CSS. Assuming all the dependencies are installed 
//Create a new file called Item.js in the src/components directory. This file will contain the main component for displaying an item.

import React from 'react';
import PropTypes from 'prop-types';

function Item({ item, onEdit, onDelete }) {
  return (
    <div className="item">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <div className="actions">
        <button onClick={() => onEdit(item)}>Edit</button>
        <button onClick={() => onDelete(item)}>Delete</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Item;

//This component takes in an item object as a prop, along with onEdit and onDelete callback functions. 
//It renders the item's title, description, and two buttons for editing and deleting the item.


//Create another file called ItemList.js in the src/components directory. This file will contain the component for displaying a list of items.

import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Item key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ItemList;

//This component takes in an array of items as a prop, along with onEdit and onDelete callback functions. 
//It maps over the items array and renders an Item component for each item.


//Create a third file called AddItemForm.js in the src/components directory. This file will contain the component for adding a new item.

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddItemForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

AddItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddItemForm;

//This component uses the useState hook to manage the form state for the title and description fields. 
//It takes in an onSubmit callback function as a prop, which is called when the form is submitted with the title and description values.


//Create a fourth file called App.js in the src directory. This file will contain the main app component,
//which will render the other components and manage the state of the app.

import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddItem = (newItem) => {
    axios.post('/api/items', newItem)
      .then((response) => setItems([...items, response.data]))
      .catch((error) => console.error(error));
  };

  const handleEditItem = (editedItem) => {
    axios.put(`/api/items/${editedItem.id}`, editedItem)
      .then((response) => {
        const updatedItems = items.map((item) => {
          if (item.id === editedItem.id) {
            return response.data;
          } else {
            return item;
          }
        });
        setItems(updatedItems);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteItem = (deletedItem) => {
    axios.delete(`/api/items/${deletedItem.id}`)
      .then(() => {
        const updatedItems = items.filter((item) => item.id !== deletedItem.id);
        setItems(updatedItems);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app">
      <h1>CRUD App</h1>
      <AddItemForm onSubmit={handleAddItem} />
      <ItemList items={items} onEdit={handleEditItem} onDelete={handleDeleteItem} />
    </div>
  );
}

export default App;

//Create a fifth file called index.css in the src directory. This file will contain the CSS styles for the app.

.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.item-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.item {
  border: 1px solid #ccc;
  padding: 10px;
}

.item h2 {
  margin-top: 0;
}

.actions {
  margin-top: 10px;
}

.actions button {
  margin-right: 10px;
}

.add-item-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.add-item-form input,
.add-item-form textarea {
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;

//Create a sixth file called index.js in the src directory. This file will render the App component and mount it to the DOM.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

//This file uses the ReactDOM.render function to render the App component and mount it to the root element in the HTML file.



//Create a server.js file in the root directory of the project. 
//This file will define the backend server using Node.js and Express, and will handle HTTP requests to the API endpoints.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// In-memory database
const items = [];

// API routes
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = {
    id: uuid.v4(),
    title: req.body.title,
    description: req.body.description,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    const updatedItem = {
      id: itemId,
      title: req.body.title,
      description: req.body.description,
    };
    items[itemIndex] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).send();
  }
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

//The file defines an in-memory database using an array called items, and defines API routes for handling HTTP GET, POST, PUT, and DELETE requests to the /api/items endpoint. 

//Start the app by running npm start in the terminal. 
//This will start the React app on http://localhost:3000, and the backend server on http://localhost:5000/api/items.
