"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_role') THEN
          CREATE TYPE "enum_users_role" AS ENUM ('admin', 'user', 'institution');
        END IF;
      END $$;
    `);
    await queryInterface.addColumn("users", "role", {
      type: "enum_users_role",
      allowNull: false,
      defaultValue: "user",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "role");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_role";',
    );
  },
};
