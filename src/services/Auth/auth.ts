import jwt from "jsonwebtoken";
import User from "../../modules/Users/Model";
import config from "../../config/config";
import { InferAttributes } from "sequelize";
import AuthenticationToken from "../../modules/Authentication/Model";

class AuthService{

  static async createLogin(data: InferAttributes<User>, deviceId: string): Promise<InferAttributes<AuthenticationToken> | null> {
    try {
      const token: string | null = await this.genreateToken(data, Date.now() / 1000 + 60 * 60);
      const refreshToken: string | null =  await this.genreateToken(data, Date.now() / 1000 + 60 * 60 * 60);

      const param: InferAttributes<AuthenticationToken> = {
        token: token,
        refreshToken,
        userId: data._id,
        deviceId: deviceId
      }

      const authenticationToken: AuthenticationToken = await AuthenticationToken.update(param, {where: {userId: data._id}, raw: true})
      return authenticationToken;
    } catch (error) {
      return null;
    }
  }

  /**
 * @param data user data to generate token
 * @returns token
 */
  static async genreateToken(data: InferAttributes<User>, expiresIn: number): Promise<string>{
    try {
      const token = jwt.sign(data, config.jwt_secret!, { algorithm: "RS256", expiresIn: expiresIn});
      return token;
    } catch (error) {
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