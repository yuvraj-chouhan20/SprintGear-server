import { InferAttributes, InferCreationAttributes, CreationOptional, Model, ForeignKey, DataTypes } from "sequelize";
import sequelizeConnection from "../../config/sequelize";
import { User } from "../Users/Model";


class Role extends Model <InferAttributes<Role>, InferCreationAttributes<Role>>{
  declare _id: CreationOptional<string>;
  declare title: string;
  declare staticKey: CreationOptional<string>;
  declare permissions: ForeignKey<Array<Permission["_id"]>>;
  declare isDefault: CreationOptional<boolean>;
  declare createdBy: ForeignKey<User["_id"]>;
  declare updatedBy: ForeignKey<User["_id"]>;
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

class Permission extends Model <InferAttributes<Permission>, InferCreationAttributes<Permission>>{
  declare _id: CreationOptional<string>;
  declare title: string;
  declare staticKey: CreationOptional<string>;
  declare moduleId: ForeignKey<Module['_id']>;
}

class Module extends Model <InferAttributes<Module>, InferCreationAttributes<Module>>{
  declare _id: CreationOptional<string>;
  declare name: string;
  declare staticKey: string;
}


Role.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  staticKey:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions:{
    type: DataTypes.ARRAY(DataTypes.UUID),
    allowNull: true,
    defaultValue: []
  },
  isDefault:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  isDeleted:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdBy:{
    type: DataTypes.UUID,
    allowNull: true,
  },
  updatedBy:{
    type: DataTypes.UUID,
    allowNull: true,
  },
  createdAt:{
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt:{
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: "roles",
  sequelize: sequelizeConnection,
  timestamps: true
})

Permission.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  staticKey:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  moduleId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: "permissions",
  sequelize: sequelizeConnection,
  timestamps: true
})

Module.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  staticKey: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "modules",
  sequelize: sequelizeConnection,
  timestamps: true
});

Role.beforeCreate((role: Role) => {
  role.staticKey = role.title.toLowerCase().split(' ').join('-');
});

Role.beforeUpdate((role: Role) => {
  role.staticKey = role.title.toLowerCase().split(' ').join('-');
});


(async () => {
  try {
    await sequelizeConnection.sync();
  } catch (error) {
    console.log(error)
  }
})();

export { Role, Permission, Module };