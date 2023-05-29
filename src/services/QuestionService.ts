import { IQuestion } from "../interfaces/IQuestion";

export abstract class QuestionService {

    public static async getQuestionsByModuleId (moduleId: string, userToken: string) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/question?` + new URLSearchParams({
            moduleId: moduleId
        }),
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        });

        return await response.json() as IQuestion[];
    }

    public static async createQuestions (questionList: Partial<IQuestion>[], userToken: string) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/question?`,
        {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify(questionList)
        });

        return await response
    }
    
    public static async updateQuestions (questionList: Partial<IQuestion>[], userToken: string) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/question?`,
        {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify(questionList)
        });

        return await response
    }

    public static async deleteQuestions (questionIdList: {questionId: string}[], userToken: string) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/question?`,
        {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify(questionIdList)
        });

        return await response
    }
 }