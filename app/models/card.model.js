module.exports = (sequelize, Sequelize) => {
  const Card = sequelize.define('card', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    }
  });

  return Card;
};