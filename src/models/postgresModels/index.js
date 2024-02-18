module.exports = (models, sequelize, Sequelize) => {

    models.blogModel = require("./blogModel")(sequelize, Sequelize);
    models.blogViewModel = require("./blogViewModel")(sequelize, Sequelize);
    return models;
};
