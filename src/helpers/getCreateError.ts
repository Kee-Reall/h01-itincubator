import { ErrorMessage, fields } from "../models/errorMessage.model";
import { lengthLimits } from "./lengthLimits";
import { message } from './message'
import {checkValidResolution} from "./checkValidResolution";

interface K extends Object {
    author: string,
    title: string
    availableResolutions? : string[] | null
}

export function getCreateError(body: K):ErrorMessage[] {
    const errorsMessages: ErrorMessage[] = []
    function addErM(message:string,field: fields = ''): void{
        errorsMessages.push(new ErrorMessage(message, field))
    }
    if(!body.hasOwnProperty('title')) {
        addErM(message.requiredMore,"title")
    } else {
        if(typeof body.title !== 'string' ) addErM(message.incorrectType,"title")
        else {
            if(body.title.trim().length > lengthLimits.maxTitle || body.title.trim().length < lengthLimits.minTitle) {
                addErM(message.lengthInvalid,"title")
            }
        }
    }
    if(!body.hasOwnProperty('author')) {
        addErM(message.requiredMore,"author")
    } else {
        if(typeof body.author !== 'string' ) addErM(message.incorrectType,'author')
        else {
            if(body.author.trim().length > lengthLimits.maxAuthor || body.author.trim().length < lengthLimits.minAuthor) {
                addErM(message.lengthInvalid,"author")
            }
        }
    }

    if(body.hasOwnProperty('availableResolutions')) {
        if(body.availableResolutions !== null) {
           if(Array.isArray(body.availableResolutions)) {
               if(body.availableResolutions.length <= 0) addErM(message.lengthInvalid,'availableResolutions')
               else {
                   if(!checkValidResolution(body.availableResolutions)) {
                   addErM(message.invalidResolution, 'availableResolutions')
                   }
               }
           }
           else {
               addErM(message.invalidResolution, 'availableResolutions')
           }
        }
    }
    return errorsMessages
}