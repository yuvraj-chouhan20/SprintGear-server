import { InferAttributes, InferCreationAttributes, CreationOptional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/sequelize";
import User from "../Users/Model";
import Category from "../Category/Model";
import { VariantProduct, VariantValue } from "../Variant/Model";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>>{
  declare _id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category_id: string;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}


Product.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  category_id: {
    type: DataTypes.UUID,
    references:{
      model: Category,
      key: "_id"
    },
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.UUID,
    references:{
      model: User,
      key: "_id"
    },
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'products',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})

Product.belongsTo(User, {foreignKey: 'createdBy', targetKey: '_id'});
Product.belongsTo(Category, {foreignKey: 'category_id', targetKey: '_id'});
Product.belongsToMany(VariantValue, { through: VariantProduct});


export default Product;
