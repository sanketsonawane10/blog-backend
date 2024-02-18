/*
 * Author Name : Sanket Sonawane
 * Description : Create Migration file for Blog View table
 */
// importing external dependencies
const { Sequelize } = require('sequelize');

module.exports = {
    async up({ context: queryInterface }) {
        await queryInterface.sequelize.transaction(async (t) => {

            await queryInterface.sequelize.query(
                ` DROP MATERIALIZED VIEW IF EXISTS blog_sch.blog_views;
                  `, { schema: 'blog_sch', transaction: t, }
            )

            await queryInterface.sequelize.query(
                `CREATE MATERIALIZED VIEW blog_sch.blog_views
                    AS
                    SELECT b.id as blog_id,
                    b.title,
                    b.content,
                    b.created_at,
                    b.updated_at
                   From blog_sch.blogs as b
                    WITH DATA`
                , { schema: 'blog_sch', underscored: true, transaction: t, });


            await queryInterface.sequelize.query(
                `CREATE UNIQUE INDEX blog_by_view ON blog_sch.blog_views (blog_id)`,
                { schema: 'blog_sch', transaction: t, });

        });
    },
    async down({ context: queryInterface }) {
        await queryInterface.sequelize.transaction(async (t) => {
            await queryInterface.sequelize.query(
                ` DROP MATERIALIZED VIEW IF EXISTS blog_sch.blog_views;
                  `, { schema: 'blog_sch', transaction: t, }
            )
        });
    },
};
