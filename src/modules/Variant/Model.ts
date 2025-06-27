import { InferAttributes, InferCreationAttributes, CreationOptional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/sequelize";
import { Product } from "../Product/Model";
import { Category } from "../Category/Model";
import CommonService from "../../services/Global/common";

/*************************************
 * VariantTemplate
 *************************************/
class VariantTemplate extends Model<InferAttributes<VariantTemplate>, InferCreationAttributes<VariantTemplate>>{
  declare _id: CreationOptional<string>;
  declare title: string;
  declare staticKey: string;
  declare category_id: CreationOptional<Array<string | []>>;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

VariantTemplate.init({
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
  // category_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // },
  staticKey:{
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: true
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'variant_templates',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

/*************************************
 * Variant
 *************************************/
class Variant extends Model<InferAttributes<Variant>, InferCreationAttributes<Variant>>{
  declare _id: CreationOptional<string>;
  declare title: string;
  declare slug: string;
  declare variant_template_id: string;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
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
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  variant_template_id: {
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


VariantTemplate.addHook("beforeValidate", (attributes: VariantTemplate) => {
  const [ slug, staticKey ] = CommonService.generateKeyAndSlug(attributes.title);
  attributes.staticKey = staticKey;
});
/*************************************
 * VariantProduct
 *************************************/
class VariantProduct extends Model<InferAttributes<VariantProduct>, InferCreationAttributes<VariantProduct>>{
  declare _id: CreationOptional<string>;
  declare variant_id: string;
  declare product_id: string;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
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
  variant_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  product_id: {
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

/*************************************
 * Variant associations
 *************************************/
Variant.belongsTo(VariantTemplate, {foreignKey: 'variant_template_id', targetKey: '_id'});
Variant.belongsToMany(Product, {foreignKey: 'variant_id', sourceKey: '_id', through: VariantProduct});
Product.belongsToMany(Variant, {foreignKey: 'product_id', sourceKey: '_id', through: VariantProduct});

/*************************************
 * VariantValue associations
 *************************************/
VariantTemplate.hasMany(Variant, {foreignKey: 'variant_template_id', sourceKey: '_id'});
VariantTemplate.belongsTo(Category, {foreignKey: 'category_id', targetKey: '_id'});


(async () => {
  try {
    await sequelizeConnection.sync();
  } catch (error) {
    console.log(error)
  }
})();
export { Variant, VariantTemplate, VariantProduct };