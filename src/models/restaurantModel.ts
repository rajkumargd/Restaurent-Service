import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Restaurant extends Model {
  public id!: number;
  public restaurantName!: string;
  public googlePlaceID!: string;
  public address!: string;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

Restaurant.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  restaurantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  googlePlaceID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Restaurant',
  tableName: 'fh_restaurants',
  timestamps: true,
});

export default Restaurant;
