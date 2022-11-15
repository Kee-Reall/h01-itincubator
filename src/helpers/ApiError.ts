import {ErrorMessage} from "../models/errorMessage.model";

export function ApiError(...errorsMessages:ErrorMessage[]){
    return {
        errorsMessages
    }
}