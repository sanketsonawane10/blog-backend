const { routePath } = require('../../utils/constants/routePath');
module.exports = (app) => {
    app.use(`${routePath}/blog`, require('../../routes/blogRoute'));
};
