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
        addErM(message.reqiredMore,'canBeDownloaded')
    }
    if(body.hasOwnProperty('publicationDate')) {
        if(!isIsoDate(body.publicationDate)) {
            addErM(message.incorrectType,'publicationDate')
        }
    } else {
        addErM(message.reqiredMore,'publicationDate')
    }
    if(body.hasOwnProperty('minAgeRestriction')) {
        if(body.minAgeRestriction !== null) {
            if(typeof body.minAgeRestriction === 'number') {
                const isCorrectLengh = body.minAgeRestriction > 18 || body.minAgeRestriction < 0
                if(!Number.isNaN(body.minAgeRestriction) && Number.isInteger(body.minAgeRestriction && isCorrectLengh)){
                    addErM(message.invalidData, 'minAgeRestriction')
                }
            }
            else {
                addErM(message.incorrectType,'minAgeRestriction')
            }
        }
    }
    else {
        addErM(message.reqiredMore,'minAgeRestriction')
    }

    return errorsMessages
    
}