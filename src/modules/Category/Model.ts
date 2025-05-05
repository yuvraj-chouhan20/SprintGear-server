import { InferAttributes, InferCreationAttributes, CreationOptional, Model, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/sequelize";
import CommonService from "../../services/Global/common";

class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>>{
  declare _id: CreationOptional<string>;
  declare title: string;
  declare staticKey: string;
  declare slug: string;
  declare parentCategory_id: string;
  declare isMainCategory: CreationOptional<boolean>;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Category.init({
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
  staticKey: {
    type: DataTypes.STRING,
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parentCategory_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  isMainCategory: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
  tableName: 'categories',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

Category.addHook("beforeCreate", (attributes: Category) => {
  if(!attributes.parentCategory_id){
    attributes.parentCategory_id = attributes._id;
    attributes.isMainCategory = true;
  }
  const [ slug, staticKey ] = CommonService.generateKeyAndSlug(attributes.title);
  attributes.slug = slug;
  attributes.staticKey = staticKey;
})

Category.addHook("beforeUpdate", (attributes: Category) => {
  const [ slug, staticKey ] = CommonService.generateKeyAndSlug(attributes.title);
  attributes.slug = slug;
  attributes.staticKey = staticKey;
})


Category.hasMany(Category, {foreignKey: 'parentCategory_id', as: 'parentCategory'});

(async () => {
  try {
    await sequelizeConnection.sync();
  } catch (error) {
    console.log(error)
  }
})();

export { Category };