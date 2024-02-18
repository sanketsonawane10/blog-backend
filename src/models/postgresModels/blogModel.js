
module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define(
        'blogs',
        {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                defaultValue: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Date.now()

            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Date.now()
            },
        },
        { underscored: true, timestamps: true, schema: 'blog_sch' });
    return Blog;
}
