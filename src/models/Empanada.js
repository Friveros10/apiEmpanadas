import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Empanada = sequelize.define(
  "Empanada",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    type: { type: DataTypes.STRING(255), allowNull: false },
    filling: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2) },
    is_sold_out: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "empanadas",
    timestamps: false,
  }
);

export default Empanada;
