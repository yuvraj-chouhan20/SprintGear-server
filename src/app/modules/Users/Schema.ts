import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize";
import { sequelizeConnection } from "../../config/sequelize";

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
  declare age: number;
  declare mobile: number;
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
  }
}, {
  tableName: 'users',
  sequelize: sequelizeConnection,
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});


(async () =>{
  await sequelizeConnection.sync({alter: true});
})();
export default User;