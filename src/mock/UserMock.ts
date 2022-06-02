import { User } from "../interfaces/User";

export const UserMockTypeOne : User = {
    id: 2,
    name: "Davi Gonçalves",
    type: "",
    email: "davihgs20@gmail.com",
    password: "",
    nickname: "",
    level: 0,
    isUserActive: false,
    experience: 0,
    icon: "/img/profile/teste.jpg",
    permission: {
        id : 0,
        description: ""
    }
}

export const UserMockTypeTwo : User = {
    id: 2,
    name: "Yngredh Costa da Cruz",
    type: "",
    email: "yngredh.cruz@gmail.com",
    password: "",
    nickname: "",
    level: 0,
    isUserActive: false,
    experience: 0,
    icon: "https://github.com/Yngredh.png",
    permission: {
        id : 0,
        description: ""
    }
}

export const ListedUsers = [UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo];