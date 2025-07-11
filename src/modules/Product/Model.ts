import { InferAttributes, InferCreationAttributes, CreationOptional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/sequelize";
import { User } from "../Users/Model";
import { Category } from "../Category/Model";
import { Variant, VariantProduct } from "../Variant/Model";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>>{
  declare _id: CreationOptional<string>;
  declare name: string;
  declare sku: string;
  declare description: string;
  declare price: number;
  declare category_id: string;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdBy: CreationOptional<string>;
  declare meta_title: string;
  declare meta_description: string;
  declare meta_keywords: string;
  declare url_slug: string;
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
  sku: {
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
    allowNull: false
  },
  meta_title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  meta_description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  meta_keywords: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url_slug: {
    type: DataTypes.STRING,
    allowNull: true
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


class ProductItem extends Model<InferAttributes<ProductItem>, InferCreationAttributes<ProductItem>>{
  declare _id: CreationOptional<string>;
  declare product_id: string;
  declare variant_id: string;
  declare sku: string;
  declare price: number;
  declare quantity: number;
  declare category_id: string;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ProductItem.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  variant_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.UUID,
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
  tableName: 'product_items',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})

Product.belongsTo(User, {foreignKey: 'createdBy', targetKey: '_id'});
Product.belongsTo(Category, {foreignKey: 'category_id', targetKey: '_id'});
// Product.belongsToMany(Variant, {foreignKey: 'product_id', sourceKey: '_id', through: VariantProduct});

(async () => {
  try {
    await sequelizeConnection.sync();
  } catch (error) {
    console.log(error)
  }
})();

export { Product };
