import { User } from "../../entities/User";
import { UserInterface } from "../../Interfaces/userInterface";

export class AuthUtils {
  public createUser = async (userData: UserInterface) => {
    try {
      const createUser = User.create(userData);
      await createUser.save();
      return createUser;
    } catch (error) {
        throw new Error(error)
    }
  };

  public checkUserExists = async(email: string) => {
      try {
          const userInfo = await User.findOne({email});
          return userInfo;
      } catch (error) {
        throw new Error(error)
      }
  }
}
