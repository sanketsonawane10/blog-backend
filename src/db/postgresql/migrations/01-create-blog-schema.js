/*
 * Author Name : Sanket Sonawane
 * Description : Migration file for creating schema for blog schema
 */

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createSchema('blog_sch');
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropSchema('blog_sch');
  },
};
