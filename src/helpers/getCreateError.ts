import e from "express";
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
        addErM(message.reqiredMore,"title")
    } else {
        if(typeof body.title !== 'string' ) addErM(message.incorrectType,"title")
        else {
            if(body.title.trim().length > 40 || body.title.trim().length < 1) {
                addErM(message.lengthInvalid,"title")
            }
        }
    }
    if(!body.hasOwnProperty('author')) {
        addErM(message.reqiredMore,"author")
    } else {
        if(typeof body.author !== 'string' ) addErM(message.incorrectType,'author')
        else {
            if(body.author.trim().length > 20 || body.author.trim().length < 1) {
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