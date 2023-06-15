import { useContext } from "react";
import { EOperation, IQuestionOperations } from "../interfaces/IModuleOperations";
import { IQuestion } from "../interfaces/IQuestion";
import { QuestionService } from "../services/QuestionService";
import { UserContext } from "../App";

export const useSaveQuestionOperations = () => {
    const userContext = useContext(UserContext);
    let listToCreate: Partial<IQuestion>[] = [];
    let listToUpdate: Partial<IQuestion>[] = [];
    let listToDelete: {questionId: string}[] = [];

    const saveQuestionsOperations = async (
        questionOperationList : IQuestionOperations[], 
        newModulesId? : { temporaryId: string; newId: string}[]) => {
        questionOperationList.forEach(item => {
            console.log(newModulesId);
            let newId = item.question.moduleTestId;
            if(item.question.moduleTestId?.includes('TEMPORARY') && newModulesId) {
                newId = (newModulesId.filter(
                        (newIdObject) => newIdObject.temporaryId === item.question.moduleTestId))
                        [0].newId;
            }

            if(item.operation === EOperation.Create) 
                listToCreate = [...listToCreate, {...item.question ,moduleTestId: newId}];
            if(item.operation === EOperation.Update) 
                listToUpdate = [...listToUpdate, {...item.question ,moduleTestId: newId}];
            if(item.operation === EOperation.Delete) 
                listToDelete = [...listToDelete, { questionId: item.question.questionId!!}]
            
        });
        
        await QuestionService.createQuestions(listToCreate, userContext.token);
        await QuestionService.updateQuestions(listToUpdate, userContext.token);
        await QuestionService.deleteQuestions(listToDelete, userContext.token);
    }

    return [saveQuestionsOperations]
}