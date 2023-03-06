import { IUser } from "../interfaces/IUser";

export const UserMockTypeOne : IUser = {
    userId: "1b4662f6-9dd6-11ed-a8fc-0242ac120002",
    name: "Davi Gonçalves",
    email: "davihgs20@gmail.com",
    password: "",
    nickname: "",
    icon: "/img/profile/level1.svg",
    role: "Desenvolvedor de Software",
    isAdministrator: false,
    hasPermission: false,
    finishedTrainingCount: 5,
    emblemCount: 1,
    levelOneEmblemCount: 0,
    levelTwoEmblemCount: 0,
    levelThreeEmblemCount: 1,
    levelFourEmblemCount: 0,
    levelFiveEmblemCount: 0
}

export const UserMockTypeTwo : IUser = {
    userId: "16645a7c-9dd6-11ed-a8fc-0242ac120002",
    name: "Yngredh Costa da Cruz",
    email: "yngredh.cruz@gmail.com",
    password: "",
    nickname: "",
    icon: "/img/profile/level2.svg",
    role: "Engenheira de Software",
    isAdministrator: false,
    hasPermission: true,
    finishedTrainingCount: 10,
    emblemCount: 4,
    levelOneEmblemCount: 1,
    levelTwoEmblemCount: 1,
    levelThreeEmblemCount: 1,
    levelFourEmblemCount: 1,
    levelFiveEmblemCount: 0
}

export const ListedUsers = [UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo, UserMockTypeOne, UserMockTypeTwo];