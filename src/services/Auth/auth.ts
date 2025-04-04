import jwt, { decode, JwtPayload } from "jsonwebtoken";
import User from "../../modules/Users/Model";
import config from "../../config/config";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import AuthenticationToken from "../../modules/Authentication/Model";

class AuthService{

  static async createLogin(data: InferAttributes<User>, deviceId: string): Promise<InferAttributes<AuthenticationToken> | {deviceId: string | null, token: string | null}> {
    try {
      const token: string | null = await AuthService.genreateToken(data, Date.now() + 2 * 60 * 60 * 1000);
      const refreshToken: string | null =  await AuthService.genreateToken(data, Date.now() + 30 * 24 * 60 * 60 * 1000);

      const param: InferAttributes<AuthenticationToken> = {
        ipAddress: "",
        token: token,
        refreshToken,
        userId: data._id,
        deviceId: deviceId
      }

      let usersAuthenticationToken: AuthenticationToken | null = await AuthenticationToken.findOne({where: { userId: data._id}});

      let authenticationToken: InferAttributes<AuthenticationToken>;
        if(usersAuthenticationToken){
        let [affectedCount, affectedRows] = await AuthenticationToken.update(param, { where: {userId: data._id, deviceId: deviceId}, returning: true});

        const userTokens = affectedRows[0].dataValues;
        return { deviceId: userTokens.deviceId, token: userTokens.token };
      }
      authenticationToken = await AuthenticationToken.create(param, {raw: true, attibutes: ["token", "deviceId"]});

      return authenticationToken;
    } catch (error) {
      console.log("Error in Create Login service",error )
      return {deviceId: null, token: null };
    }
  }

  /**
   * 
   * @param data user data to genreate password reset token
   * @returns 
   */
  static async generateForgotPasswordToken(data: InferAttributes<User>): Promise<boolean | string> {
    const expiresIn: number = Date.now() + 10 * 60 * 60 * 1000
    const token = jwt.sign(data, config.password_reset_secret_key!, { algorithm: "HS256", expiresIn});

    const [ affectedCount, affectedRows] = await User.update({passwordResetToken: token, passwordResetTokenExpiration: new Date(Date.now() + 10 * 60 * 60 * 1000) }, { where: { _id: data._id}, returning: true});

    if(affectedCount && affectedRows && affectedRows[0]){
      return token;
    }
    return false;
  }

  static async checkResetTokenExpiration(token: string): Promise<JwtPayload | string | null >{
    try {
      const decodedToken: string | JwtPayload = await jwt.verify(token, config.password_reset_secret_key!);
      if(decodedToken && typeof decodedToken !== "string"){
        const userData: User | null = await User.findOne({where: {_id: decodedToken._id}, raw: true});

        if(userData && userData?.passwordResetTokenExpiration < new Date(Date.now())){
          return null
      }
      return decodedToken
    }
    return null
  } catch (error) {
    console.log("Error in checking Reset Password", error)
      return null
    }
  }

  /**
 * @param data user data to generate token
 * @returns token
 */
  static async genreateToken(data: InferAttributes<User>, expiresIn?: number): Promise<string>{
    try {
      const token = jwt.sign(data, config.jwt_secret!, { algorithm: "HS256", expiresIn: expiresIn});
      return token;
    } catch (error) {
      console.log("error in genreating token", error)
      return "";
    }
  }

  /**
   *
   * @param token token to verify
   * @returns decoded token
   */

  static async verifyToken(token: string){
    try {
      const decodedToken = jwt.verify(token, config.jwt_secret!);
      return decodedToken;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

export default AuthService;