import {ErrorMessage} from "../models/errorMessage.model";

export function ApiError(...errorMessages:ErrorMessage[]){
    return {
        errorMessages
    }
}