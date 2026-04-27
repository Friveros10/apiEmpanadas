"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombres_: Sequelize.STRING,
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos_: Sequelize.STRING,
      rut: {
        type: Sequelize.STRING,
        unique: true,
      },
      telefono: Sequelize.STRING,
      nombreApellido_: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      completado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      eliminado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tipo: {
        type: Sequelize.ENUM("Administrador", "SuperAdmin", "Cliente", "Otro"),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
