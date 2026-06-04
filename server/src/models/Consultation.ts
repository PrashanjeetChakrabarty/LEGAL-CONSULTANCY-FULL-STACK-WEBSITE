import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export class Consultation extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public practiceArea!: string;
  public consultationMode!: string;
  public description!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Consultation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    practiceArea: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Corporate Law",
    },
    consultationMode: {
      type: DataTypes.ENUM("online", "in-person"),
      allowNull: false,
      defaultValue: "online",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "consultations",
    underscored: true,
  }
);

export default Consultation;
