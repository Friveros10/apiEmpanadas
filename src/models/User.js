import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombres_: {
      type: DataTypes.STRING,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos_: {
      type: DataTypes.STRING,
    },
    rut: {
      type: DataTypes.STRING,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    nombreApellido_: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tipo: {
      type: DataTypes.ENUM("Administrador", "SuperAdmin", "Cliente", "Otro"),
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

export default User;