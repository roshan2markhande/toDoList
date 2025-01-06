const express=require('express');

const app=express();
const mongoose=require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); // for parsing JSON

const Item = require('./models/item');
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/to-do-list', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));
  
  app.get('/items', async (req, res) => {
    try {
      const items = await Item.find(); 
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching items' });
    }
  });
  
  app.post('/items', async (req, res) => {
    try {
      const newItem = new Item({ name: req.body.name }); 
      await newItem.save(); 
      res.status(201).json(newItem); 
    } catch (err) {
      res.status(500).json({ message: 'Error adding item' });
    }
  });
  app.delete('/items/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const deletedItem = await Item.findByIdAndDelete(itemId); // Delete the item from DB
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting item', error: err });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });