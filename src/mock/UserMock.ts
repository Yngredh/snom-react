import { User } from "../interfaces/User";

export const UserMock : User = {
    id: 2,
    name: "Adalberto Teshima",
    type: "",
    email: "davihgs20@gmail.com",
    password: "",
    nickname: "",
    level: 0,
    isUserActive: false,
    experience: 0,
    icon: "",
    permission: {
        id : 0,
        description: ""
    }
}

export const ListedUsers = [UserMock, UserMock, UserMock, UserMock, UserMock, UserMock, UserMock, UserMock, UserMock, UserMock]