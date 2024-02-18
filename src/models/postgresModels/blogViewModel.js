
module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define(
        'blog_views',
        {},
        { underscored: true, timestamps: true, schema: 'blog_sch' });
    return Blog;
}
