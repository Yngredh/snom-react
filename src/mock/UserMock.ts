import { IUser } from "../interfaces/IUser";

export const UserMockTypeOne : IUser = {
    id: 2,
    name: "Davi Gonçalves",
    email: "davihgs20@gmail.com",
    password: "",
    nickname: "",
    icon: "/img/profile/teste.jpg",
    role: "Desenvolvedor de Software",
    isAdministrator: false,
    hasPermission: false
}

export const UserMockTypeTwo : IUser = {
    id: 2,
    name: "Yngredh Costa da Cruz",
    email: "yngredh.cruz@gmail.com",
    password: "",
    nickname: "",
    icon: "https://github.com/Yngredh.png",
    role: "Engenheira de Software",
    isAdministrator: false,
    hasPermission: false
}

export const ListedUsers = [UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo];