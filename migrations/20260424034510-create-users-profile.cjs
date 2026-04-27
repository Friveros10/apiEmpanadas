'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserProfiles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // tabla Users
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      rut: {
        type: Sequelize.STRING,
      },

      genero: {
        type: Sequelize.STRING,
      },

      fechaNacimiento: {
        type: Sequelize.DATE,
      },

      telefono: {
        type: Sequelize.STRING,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserProfiles");
  },
};
