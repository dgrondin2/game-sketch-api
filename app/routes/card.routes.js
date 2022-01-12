/*
  /api/cards            GET, POST
  /api/cards/:id        GET, PUT, DELETE
  /api/cards/category   GET
*/

module.exports = app => {
  const cards = require('../controllers/card.controller.js');
  const router = require('express').Router();

  // Create a new Card
  router.post('/', cards.create);

  // Retrieve all Cards
  router.post('/', cards.findAll);

  // Retrieve a single Card by id
  router.get('/:id', cards.findOne);

  // Retrieve Cards by category
  router.get('/category', cards.findAllByCategory);

  // Update a Card by id
  router.put('/:id', cards.update);

  // Delete a card by id
  router.delete('/:id', cards.delete);

  app.use('/api/cards', router);
}