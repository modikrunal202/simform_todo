import { User } from "../../entities/User";
import { UserInterface } from "../../Interfaces/userInterface";
import { getConnection } from "typeorm";

export class AuthUtils {
  public createUser = async (userData: UserInterface) => {
    try {
      const createUser = User.create(userData);
      await createUser.save();
      return createUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  public checkUserExists = async (email: string) => {
    try {
      const userInfo = await User.findOne({ email });
      return userInfo;
    } catch (error) {
      throw new Error(error);
    }
  };
  public checkOrCreateUser = async (userData: any) => {
    try {
      const userInfo = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(userData)
        .onConflict(`("id") DO UPDATE SET "first_name" = :first_name`)
        .setParameter("first_name", userData.first_name)
        .execute();
      console.log("userInfo", userInfo);

      return userInfo;
    } catch (error) {
      throw new Error(error);
    }
  };
}
