import { InferAttributes, InferCreationAttributes, CreationOptional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/sequelize";
import User from "../Users/Model";
import Product from "../Product/Model";
import Category from "../Category/Model";


class Variant extends Model<InferAttributes<Variant>, InferCreationAttributes<Variant>>{
  declare _id: CreationOptional<string>;
  declare title: string;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Variant.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
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
    references: {
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
  tableName: 'variants',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});


class VariantValue extends Model<InferAttributes<VariantValue>, InferCreationAttributes<VariantValue>>{
  declare _id: CreationOptional<string>;
  declare variant_id: string;
  declare value: string;
  declare category_id: string;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

VariantValue.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  variant_id: {
    type: DataTypes.UUID,
    references: {
      model: Variant,
      key: "_id"
    },
    allowNull: false
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: {
    type: DataTypes.UUID,
    references: {
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
    references: {
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
  tableName: 'variant_values',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

/**
 * VariantProduct
 */
class VariantProduct extends Model<InferAttributes<VariantProduct>, InferCreationAttributes<VariantProduct>>{
  declare _id: CreationOptional<string>;
  declare variant_value_id: string;
  declare product_id: string;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

VariantProduct.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  variant_value_id: {
    type: DataTypes.UUID,
    references: {
      model: VariantValue,
      key: "_id"
    },
    allowNull: false
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: Product,
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
    references: {
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
  tableName: 'variant_product',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

/**
 * Variant associations
 */
Variant.belongsTo(User, {foreignKey: 'createdBy', targetKey: '_id'});
Variant.hasMany(VariantValue, {foreignKey: 'variant_id', sourceKey: '_id'});

/**
 * VariantProduct associations
 */
// VariantProduct.belongsTo(VariantValue, {foreignKey: 'variant_value_id', targetKey: '_id'});
// VariantProduct.belongsTo(Product, {foreignKey: 'product_id', targetKey: '_id'});

/**
 * VariantValue associations
 */
VariantValue.belongsTo(Variant, {foreignKey: 'variant_id', targetKey: '_id'});
VariantValue.belongsToMany(Product, {foreignKey: 'variant_value_id', sourceKey: '_id', through: VariantProduct});


export { Variant, VariantValue, VariantProduct};