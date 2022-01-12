// TODO: username field too? will need email validation so email is required either way

module.exports = (sequelize, Sequelize) => {
  const Card = sequelize.define('user', {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};