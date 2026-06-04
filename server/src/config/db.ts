import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "fv_legal_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "root123",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully via Sequelize");
    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("✅ All MySQL tables synced");
  } catch (error) {
    console.error("❌ MySQL connection failed:", error);
    process.exit(1);
  }
};

export default sequelize;
