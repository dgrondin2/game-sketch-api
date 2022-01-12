const db = require('../models');
const Card = db.cards;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validation
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Create new Card
  const card = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category
  };

  // Save Card in db
  Card.create(card)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || 'An error occurred while creating the Card.'
      });
    });
};

exports.findAll = (req, res) => {
  Card.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || 'An error occurred while fetching Cards.'
      });
    });
}

exports.findAllByCategory = (req, res) => {
  const category = req.query.category;
  const condition = category ? { category: { [Op.iLike]: `%${category}%`}} : null;

  Card.findAll({where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || 'An error occurred while retriving Cards.'
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Card.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find Card with id=${id}.`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: `Error retrieving Card with id=${id}.`
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Card.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Card was updated successfully.'
        });
      }
      else {
        res.send({
          message: `Cannot update Card with id=${id}.`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || `Error updating Card with id=${id}.`
      })
    })
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Card.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'Card deleted successfully'
        });
      }
      else {
        res.send({
          message: `Cannot delete Card with id=${id}.`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || `Could not delete Card with id=${id}.`
      });
    })
};