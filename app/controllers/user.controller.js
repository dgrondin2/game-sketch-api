const db = require('../models');
const Card = db.cards;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validation
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'Must give an email and password!'
    });
    return;
  }

  // Create new User
  const user = {
    email: req.body.email,
    password: argon2.hash(req.body.password),
  };

  // Save user in db
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || 'An error occurred while creating the user.'
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || 'An error occurred while fetching users.'
      });
    });
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      }
      else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: `Error retrieving user with id=${id}.`
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'User was updated successfully.'
        });
      }
      else {
        res.send({
          message: `Cannot update user with id=${id}.`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || `Error updating user with id=${id}.`
      })
    })
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: 'User deleted successfully'
        });
      }
      else {
        res.send({
          message: `Cannot delete user with id=${id}.`
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || `Could not delete user with id=${id}.`
      });
    })
};