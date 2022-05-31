import { User } from "../interfaces/User";


export abstract class UserService {

    private static DefaultUrl = "https://snom-back-staging.herokuapp.com/api";

    public static async getAllUsers() : Promise<User[]> {
        const response = await fetch(`${this.DefaultUrl}/user`);
        return await response.json() as User[];
    }
}