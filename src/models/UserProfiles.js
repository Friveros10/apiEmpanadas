import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    rut: {
      type: DataTypes.STRING,
    },
    genero: {
      type: DataTypes.STRING,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
    },
    telefono: {
      type: DataTypes.STRING,
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
    tableName: "UserProfiles",
    timestamps: true,
  }
); 

export default UserProfile;