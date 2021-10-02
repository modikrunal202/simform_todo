import * as jwt from "jsonwebtoken";

export class Jwt {
  /*
  * getAuthToken
  */
  public static getAuthToken(data: any) {
    return jwt.sign(data, 'secret');
  }

  /*
  * decodeAuthToken
  */
  public static decodeAuthToken(token: string) {
    if (token) {
      try {
        return jwt.verify(token, 'secret');
      } catch (error) {
        // logger.error(error);
        return false;
      }
    }
    return false;
  }
}
