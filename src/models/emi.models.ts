import { DataTypes } from "sequelize";
import sequelize from "../config/database.config.js";

const EMI = sequelize.define("EMI", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  loan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  interest_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  loan_tenure_months: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emi: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  prepayment_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  remaining_balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

export default EMI;
