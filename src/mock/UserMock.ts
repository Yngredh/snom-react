import { IUser } from "../interfaces/IUser";

export const UserMockTypeOne : IUser = {
    userId: "1b4662f6-9dd6-11ed-a8fc-0242ac120002",
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
    userId: "16645a7c-9dd6-11ed-a8fc-0242ac120002",
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