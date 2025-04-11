import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association, NonAttribute, HasOneSetAssociationMixin, HasOneGetAssociationMixin } from "sequelize";
import sequelizeConnection from "../../config/sequelize";
import bcrypt from "bcrypt";
import AuthenticationToken from "../Authentication/Model";
import { HasManyGetAssociationsMixin } from "sequelize";
import { Role } from "../Roles/Model";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
  declare _id: CreationOptional<string>;
  declare fullName: string;
  declare email: string;
  declare password: string;
  declare address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  declare gender: 'male' | 'female' | 'other';
  declare isDeleted: boolean;
  declare age: number;
  declare mobile: number;
  declare passwordResetToken: CreationOptional<string>
  declare passwordResetTokenExpiration: CreationOptional<Date>
  declare status: boolean;
  declare roleId: string;

  declare getAuthenticationTokens: HasManyGetAssociationsMixin<AuthenticationToken>;
  declare getRole: HasOneGetAssociationMixin<Role>;
}

User.init({
  _id:{
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  fullName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  address:{
    type: DataTypes.JSON,
    allowNull: false
  },
  age:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mobile:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  passwordResetToken:{
    type:DataTypes.TEXT,
    allowNull: true
  },
  passwordResetTokenExpiration:{
    type: DataTypes.DATE,
    allowNull: true
  },
  roleId: {
    type: DataTypes.UUID,
    references: {
      model: Role,
      key: "_id"
    },
    allowNull: false
  }
}, {
  tableName: 'users',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

User.hasMany(AuthenticationToken);
User.belongsTo(Role, {foreignKey: 'roleId', targetKey: '_id'});

User.addHook("beforeCreate", (user: User) => {
  user.password = bcrypt.hashSync(user.password, 10)  ;
});

User.addHook("beforeUpdate", (user: User) => {
  if(user.password !== undefined){
    user.password = bcrypt.hashSync(user.password, 10);
  }
});


(async () =>{
  await sequelizeConnection.sync({alter: true});
})();
export default User;