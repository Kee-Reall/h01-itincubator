import {UpdateVideoModel} from "../models/video.model";
import {ErrorMessage, fields} from "../models/errorMessage.model";
import { getCreateError } from "./getCreateError";
import { message } from "./message";
import { isIsoDate } from "./isIsoDate";


export function getUpdateError(body: UpdateVideoModel): ErrorMessage[] {
    
    const errorsMessages:ErrorMessage[] = [...getCreateError(body)]
    function addErM(message:string,field: fields = ''): void {
        console.log("trying to push")
        errorsMessages.push(new ErrorMessage(message, field))
    }
    if(body.hasOwnProperty('canBeDownloaded')) {
        if(typeof body.canBeDownloaded !== 'boolean') {
            addErM(message.incorrectType,'canBeDownloaded')
        }
    } else {
        addErM(message.requiredMore,'canBeDownloaded')
    }
    if(body.hasOwnProperty('publicationDate')) {
        if(!isIsoDate(body.publicationDate)) {
            addErM(message.incorrectType,'publicationDate')
        }
    } else {
        addErM(message.requiredMore,'publicationDate')
    }
    if(body.hasOwnProperty('minAgeRestriction')) {
        if(body.minAgeRestriction !== null) {
            if(typeof body.minAgeRestriction === 'number') {// !Number.isInteger(body.minAgeRestriction)
                if(!Number.isInteger(body.minAgeRestriction)) addErM(message.incorrectType,'minAgeRestriction')
                if(Number.isNaN(body.minAgeRestriction)) addErM(message.incorrectType,'minAgeRestriction')
                if(body.minAgeRestriction > 18 || body.minAgeRestriction < 0) addErM(message.invalidData,'minAgeRestriction')
            }
            else {
                addErM(message.incorrectType,'minAgeRestriction')
            }
        }
    }
    else {
        addErM(message.requiredMore,'minAgeRestriction')
    }

    return errorsMessages
    
}