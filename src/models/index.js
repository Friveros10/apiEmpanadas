import sequelize from "../config/database.js";
import User from "./User.js";
import UserProfile from "./UserProfiles.js";

// relaciones
User.hasOne(UserProfile, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
});

UserProfile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { sequelize, User, UserProfile };
