import { IToken } from "../interfaces/IToken";
import { IUser } from "../interfaces/IUser";


export abstract class UserService {

    public static async authenticate(userData: Partial<IUser>) : Promise<string> {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/authenticate/`, {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        console.log(response);

        if(response.status === 404) return "";

        const tokenResponse = await response.json() as IToken;
        return tokenResponse.token;
    }

    public static async getAllUsers() : Promise<IUser[]> {
        const response = await fetch(`https://${process.env.REACT_APP_API_URL}/user`, {
            headers : { 
                'Content-Type': 'application/json',
            }
        });
        console.log(response);
        return await response.json() as IUser[];
    }

    public static async editUser(newUserData: Partial<IUser>) : Promise<number> {
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

    public static async createUser(newUser: Partial<IUser>) : Promise<number> {
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