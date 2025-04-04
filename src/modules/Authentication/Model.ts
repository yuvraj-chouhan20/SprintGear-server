import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Model, ForeignKey, BelongsToGetAssociationMixin } from "sequelize";
import sequelizeConnection from "../../config/sequelize";
import User from "../Users/Model";


class AuthenticationToken extends Model<InferAttributes<AuthenticationToken>, InferCreationAttributes<AuthenticationToken>>{
  declare _id?: CreationOptional<string>;
  declare userId: ForeignKey<User['_id']>;
  declare deviceId: string;
  declare token: string;
  declare ipAddress: CreationOptional<string>;
  declare refreshToken: string;

  declare getUsers: BelongsToGetAssociationMixin<User>
}

AuthenticationToken.init({
  _id:{
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  userId: {
    type:  DataTypes.UUID,
    allowNull: false,
  },
  deviceId: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "web"
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  refreshToken:{
    type: DataTypes.TEXT,
    allowNull: false
  }
},{
  tableName: "authenticationtokens",
  sequelize: sequelizeConnection,
  timestamps: true,
})


export default AuthenticationToken;