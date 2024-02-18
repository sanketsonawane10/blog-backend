

/*
 * Author Name : Sanket Sonawane
 * Description : Migration file for creating blogs
 */

// importing external dependencies
const { Sequelize } = require('sequelize');

module.exports = {
    async up({ context: queryInterface }) {
        await queryInterface.sequelize.transaction(async (t) => {
            await queryInterface.createTable('blogs', {

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

            }, { schema: 'blog_sch', transaction: t, });

        });
    },
    async down({ context: queryInterface }) {
        await queryInterface.sequelize.transaction(async (t) => {
            await queryInterface.dropTable({ tableName: 'blogs', schema: 'blog_sch', transaction: t, });
        });
    },
};

