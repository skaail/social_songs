const express = require('express')
const router = express.Router()
const UserListas = require('../models/Lista')
const User = require('../models/User')
const albumArt = require( 'album-art' )

router.post('/userLista/:userId/addItems', async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.params.userId;
        const art = await albumArt(items[0].band, {album: items[0].album})
    
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Find the userWithItems document
        let userWithItems = await UserListas.findOne({ user: userId });
    
        // If userWithItems document doesn't exist, create a new one
        if (!userWithItems) {
          userWithItems = new UserWithItems({ user: userId, items: [] });
        }
        
        const updatedItems = items.map(item => ({
            ...item,
            art
          }));
    
        // Add items to the existing array
        userWithItems.items.push(...updatedItems);
    
        // Save the updated userWithItems
        const updatedUserWithItems = await userWithItems.save();
    
        res.status(200).json(updatedUserWithItems);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
    
  });
  

router.get('/userLista', async (req, res) => {
    try {
      const usersWithItems = await UserListas.find().populate('user');
  
      res.status(200).json(usersWithItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  module.exports = router;