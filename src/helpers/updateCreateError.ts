import {UpdateVideoModel} from "../models/video.model";
import {ErrorMessage} from "../models/errorMessage.model";
//import {ApiError} from "./ApiError";

export function updateCreateError(body: UpdateVideoModel) {
    const errorMessages:ErrorMessage[] = []


    return{
        ...errorMessages
    }
}