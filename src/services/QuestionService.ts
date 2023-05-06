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
    
 }