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

    public static async editUser(newUserData: Partial<User>) : Promise<number> {
        const response = await fetch(`https://${process.env.REACT_APP_API_URL}/user`, {
            method: 'PUT',
            headers : { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserData)
        });
        console.log(response);
        return response.status;
    }

    public static async createUser(newUser: Partial<User>) : Promise<number> {
        const response = await fetch(`https://${process.env.REACT_APP_API_URL}/user`, {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });
        console.log(response);
        return response.status;
    }

    public static async deleteUser(userId: number) : Promise<number> {
        const response = await fetch(`https://${process.env.REACT_APP_API_URL}/user`, {
            method: 'DELETE',
            headers : { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId
            })
        });
        console.log(response);
        return response.status;
    }
}