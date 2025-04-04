import { InferAttributes, InferCreationAttributes, CreationOptional, Model, ForeignKey, DataTypes } from "sequelize";
import User from "../Users/Model";
import sequelizeConnection from "../../config/sequelize";


class Role extends Model <InferAttributes<Role>, InferCreationAttributes<Role>>{
  declare _id: CreationOptional<string>
  declare title: string;
  declare statickKey: CreationOptional<string>;
  declare permissions: ForeignKey<Array<Permission["_id"]>>;
  declare createdBy: ForeignKey<User["_id"]>
  declare updatedBy: ForeignKey<User["_id"]>
  declare isDeleted: CreationOptional<boolean>;
  declare status: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

class Permission extends Model <InferAttributes<Permission>, InferCreationAttributes<Permission>>{
  declare _id: CreationOptional<string>;
  declare title: string;
  declare staticKey: CreationOptional<string>;
  declare moduleId: ForeignKey<Module['_id']>
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
    defaultValue: DataTypes.UUIDV4
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  statickKey:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  permissions:{
    type: DataTypes.ARRAY,
    allowNull: false,
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  updatedBy:{
    type: DataTypes.STRING,
    allowNull: false,
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

})


export { Role, Permission, Module}