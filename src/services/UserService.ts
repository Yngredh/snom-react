import { User } from "../interfaces/User";


export abstract class UserService {

    public static async getAllUsers() : Promise<User[]> {
        const response = await fetch(`https://${process.env.REACT_APP_API_URL}/user`, {
            headers : { 
                'Content-Type': 'application/json',
            }
        });
        console.log(response);
        return await response.json() as User[];
    }
}